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

export type UpdateFeaturesSchema = typeof updateSignSchema;
