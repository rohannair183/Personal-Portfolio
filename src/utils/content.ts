import { getCollection } from 'astro:content';
import reading from '../data/reading.yaml';

export type RecentItem = {
	type: 'log' | 'essay' | 'project';
	title: string;
	summary: string;
	date: Date;
	href: string;
};

function byNewest(items: RecentItem[]): RecentItem[] {
	return [...items].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getIndexItems(type: RecentItem['type']): Promise<RecentItem[]> {
	switch (type) {
		case 'log': {
			const entries = await getCollection('logs', ({ data }) => !data.draft);
			return byNewest(
				entries.map((entry) => ({
					type: 'log' as const,
					title: entry.data.title,
					summary: entry.data.summary,
					date: entry.data.date,
					href: `/logs/${entry.id}`,
				})),
			);
		}
		case 'essay': {
			const entries = await getCollection('essays', ({ data }) => !data.draft);
			return byNewest(
				entries.map((entry) => ({
					type: 'essay' as const,
					title: entry.data.title,
					summary: entry.data.summary,
					date: entry.data.date,
					href: `/essays/${entry.id}`,
				})),
			);
		}
		case 'project': {
			const entries = await getCollection('projects');
			return byNewest(
				entries.map((entry) => ({
					type: 'project' as const,
					title: entry.data.title,
					summary: entry.data.description,
					date: entry.data.date,
					href: `/projects/${entry.data.slug}`,
				})),
			);
		}
	}
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

export function typeLabel(type: RecentItem['type']): string {
	switch (type) {
		case 'log':
			return 'Log';
		case 'essay':
			return 'Essay';
		case 'project':
			return 'Project';
	}
}

export type Note = {
	title: string;
	summary: string;
	date: Date;
	href: string;
	topic?: string;
	reading?: string;
};

export type BookGroup = {
	slug: string;
	title: string;
	url?: string;
	notes: Note[];
};

export type TopicSection = {
	slug: string;
	title: string;
	description?: string;
	href: string;
	groups: BookGroup[];
	ungrouped: Note[];
};

const readingBySlug = new Map(
	reading.items.map((item) => [item.slug, { title: item.title, url: item.url }]),
);

function toNotes(
	logs: Awaited<ReturnType<typeof getCollection<'logs'>>>,
	essays: Awaited<ReturnType<typeof getCollection<'essays'>>>,
): Note[] {
	return [
		...logs.map((entry) => ({
			title: entry.data.title,
			summary: entry.data.summary,
			date: entry.data.date,
			href: `/logs/${entry.id}`,
			topic: entry.data.topic,
			reading: entry.data.reading,
		})),
		...essays.map((entry) => ({
			title: entry.data.title,
			summary: entry.data.summary,
			date: entry.data.date,
			href: `/essays/${entry.id}`,
			topic: entry.data.topic,
			reading: entry.data.reading,
		})),
	];
}

function byNewestNotes(notes: Note[]): Note[] {
	return [...notes].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function groupNotesByReading(notes: Note[]): { groups: BookGroup[]; ungrouped: Note[] } {
	const grouped = new Map<string, Note[]>();
	const ungrouped: Note[] = [];

	for (const note of notes) {
		if (note.reading && readingBySlug.has(note.reading)) {
			const list = grouped.get(note.reading) ?? [];
			list.push(note);
			grouped.set(note.reading, list);
		} else {
			ungrouped.push(note);
		}
	}

	const groups: BookGroup[] = [...grouped.entries()]
		.map(([slug, groupNotes]) => {
			const item = readingBySlug.get(slug)!;
			return {
				slug,
				title: item.title,
				url: item.url,
				notes: byNewestNotes(groupNotes),
			};
		})
		.sort((a, b) => b.notes[0]!.date.getTime() - a.notes[0]!.date.getTime());

	return { groups, ungrouped: byNewestNotes(ungrouped) };
}

export async function getAllNotes(): Promise<Note[]> {
	const [logs, essays] = await Promise.all([
		getCollection('logs', ({ data }) => !data.draft),
		getCollection('essays', ({ data }) => !data.draft),
	]);

	return byNewestNotes(toNotes(logs, essays));
}

export async function getRecentlyUpdated(limit = 5): Promise<Note[]> {
	const notes = await getAllNotes();
	return notes.filter((note) => note.topic).slice(0, limit);
}

export async function getTopicsIndex(): Promise<{ sections: TopicSection[]; other: Note[] }> {
	const [mocs, notes] = await Promise.all([getCollection('mocs'), getAllNotes()]);

	const topicSlugs = new Set(mocs.map((topic) => topic.data.slug));

	const sections: TopicSection[] = mocs
		.sort((a, b) => a.data.title.localeCompare(b.data.title))
		.map((topic) => {
			const topicNotes = notes.filter((note) => note.topic === topic.data.slug);
			const { groups, ungrouped } = groupNotesByReading(topicNotes);

			return {
				slug: topic.data.slug,
				title: topic.data.title,
				description: topic.data.description,
				href: `/mocs/${topic.data.slug}`,
				groups,
				ungrouped,
			};
		});

	const other = byNewestNotes(
		notes.filter((note) => !note.topic || !topicSlugs.has(note.topic)),
	);

	return { sections, other };
}
