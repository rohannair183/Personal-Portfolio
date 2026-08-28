import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const proseSchema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	summary: z.string(),
	tags: z.array(z.string()).optional(),
	topic: z.string().optional(),
	reading: z.string().optional(),
	draft: z.boolean().default(false),
});

const logs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/logs' }),
	schema: proseSchema,
});

const essays = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
	schema: proseSchema,
});

const mocs = defineCollection({
	loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/mocs' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string().optional(),
		links: z.array(
			z.object({
				type: z.enum(['log', 'essay', 'project', 'external']),
				slug: z.string().optional(),
				label: z.string().optional(),
				url: z.string().url().optional(),
			}),
		),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		date: z.coerce.date(),
		description: z.string(),
		url: z.string().url().optional(),
		topic: z.string().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

export const collections = { logs, essays, mocs, projects };
