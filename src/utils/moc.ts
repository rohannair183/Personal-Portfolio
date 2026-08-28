import type { CollectionEntry } from 'astro:content';

type MocLink = CollectionEntry<'mocs'>['data']['links'][number];

export function resolveMocLink(link: MocLink): { href: string; label: string } {
	if (link.type === 'external') {
		return {
			href: link.url ?? '#',
			label: link.label ?? link.url ?? 'Link',
		};
	}

	const slug = link.slug ?? '';
	const defaults: Record<Exclude<MocLink['type'], 'external'>, { href: string; label: string }> = {
		log: { href: `/logs/${slug}`, label: slug },
		essay: { href: `/essays/${slug}`, label: slug },
		project: { href: `/projects/${slug}`, label: slug },
	};

	const base = defaults[link.type];
	return {
		href: base.href,
		label: link.label ?? base.label,
	};
}
