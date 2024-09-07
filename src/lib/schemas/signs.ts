import { z } from 'zod';

export const updateSignSchema = z.object({
	annotated: z.boolean(),
	annotation: z.string(),
	annotationArray: z.array(z.number()).length(179),
	created_at: z.string().datetime(),
	id: z.number(),
	is_annotated: z.number(),
	last_changed: z.string().datetime(),
	name: z.string(),
	selected: z.boolean(),
	theme: z.array(z.string()),
	video: z.string(),
	written_annotation: z.array(z.string()),
});

export const createSignSchema = z.object({
	annotated: z.boolean().optional(),
	annotation: z.string().optional(),
	annotationArray: z.array(z.number()).length(179).optional(),
	is_annotated: z.number().optional(),
	name: z.string().min(1, { message: 'Name is required' }).max(100),
	theme: z.array(z.string()).min(1, { message: 'At least one theme is required' }),
	videoUrl: z.string().optional(),
	video: z.instanceof(File, { message: 'Video is required.' }).optional(),
	written_annotation: z.array(z.string()).optional(),
});

export type UpdateSignSchema = typeof updateSignSchema;
export type CreateSignSchema = typeof createSignSchema;
