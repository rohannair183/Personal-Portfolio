import { getCollection } from 'astro:content';

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

export async function getRecentlyUpdated(limit = 5): Promise<RecentItem[]> {
	const groups = await Promise.all(
		(['log', 'essay', 'project'] as const).map((type) => getIndexItems(type)),
	);

	return byNewest(groups.flat()).slice(0, limit);
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
};

export type TopicSection = {
	slug: string;
	title: string;
	description?: string;
	href: string;
	notes: Note[];
};

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
		})),
		...essays.map((entry) => ({
			title: entry.data.title,
			summary: entry.data.summary,
			date: entry.data.date,
			href: `/essays/${entry.id}`,
			topic: entry.data.topic,
		})),
	];
}

function byNewestNotes(notes: Note[]): Note[] {
	return [...notes].sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function getAllNotes(): Promise<Note[]> {
	const [logs, essays] = await Promise.all([
		getCollection('logs', ({ data }) => !data.draft),
		getCollection('essays', ({ data }) => !data.draft),
	]);

	return byNewestNotes(toNotes(logs, essays));
}

export async function getTopicsIndex(): Promise<{ sections: TopicSection[]; other: Note[] }> {
	const [mocs, notes] = await Promise.all([getCollection('mocs'), getAllNotes()]);

	const topicSlugs = new Set(mocs.map((topic) => topic.data.slug));

	const sections: TopicSection[] = mocs
		.sort((a, b) => a.data.title.localeCompare(b.data.title))
		.map((topic) => ({
			slug: topic.data.slug,
			title: topic.data.title,
			description: topic.data.description,
			href: `/mocs/${topic.data.slug}`,
			notes: byNewestNotes(notes.filter((note) => note.topic === topic.data.slug)),
		}));

	const other = byNewestNotes(
		notes.filter((note) => !note.topic || !topicSlugs.has(note.topic)),
	);

	return { sections, other };
}
