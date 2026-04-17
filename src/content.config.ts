import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    category: z.string(),
    year: z.number(),
    status: z.enum(['live', 'case-study', 'archived']),
    featured: z.boolean().default(false),
    coverImage: z.string(),
    coverAlt: z.string(),
    liveUrl: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    tech: z.array(z.string()),
    metrics: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .optional(),
    problem: z.string(),
    role: z.string(),
    duration: z.string(),
    seo: z.object({
      description: z.string().max(160),
      ogImage: z.string().optional(),
    }),
  }),
})

export const collections = { projects }
