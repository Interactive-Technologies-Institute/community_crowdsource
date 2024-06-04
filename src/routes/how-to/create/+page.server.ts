import { createHowToSchema } from '@/schemas/how-to';
import { handleFormAction, handleSignInRedirect } from '@/utils';
import type { StorageError } from '@supabase/storage-js';
import { fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { v4 as uuidv4 } from 'uuid';

export const load = async (event) => {
	const { session } = await event.locals.safeGetSession();
	if (!session) {
		return redirect(302, handleSignInRedirect(event));
	}

	return {
		createForm: await superValidate(zod(createHowToSchema), {
			id: 'create-howto',
		}),
	};
};

export const actions = {
	default: async (event) =>
		handleFormAction(event, createHowToSchema, 'create-howto', async (event, userId, form) => {
			async function uploadImage(
				image: File
			): Promise<{ path: string; error: StorageError | null }> {
				const fileExt = image.name.split('.').pop();
				const filePath = `${userId}_${uuidv4()}.${fileExt}`;

				const { data: imageFileData, error: imageFileError } = await event.locals.supabase.storage
					.from('howtos')
					.upload(filePath, image);

				if (imageFileError) {
					setFlash({ type: 'error', message: imageFileError.message }, event.cookies);
					return { path: '', error: imageFileError };
				}

				return { path: imageFileData.path, error: null };
			}

			let imagePath = '';
			if (form.data.image) {
				const { path, error } = await uploadImage(form.data.image);
				if (error) {
					return fail(500, withFiles({ message: error.message, form }));
				}
				imagePath = path;
			} else if (form.data.imageUrl) {
				imagePath = form.data.imageUrl.split('/').pop() ?? '';
			}

			const stepsWithImages = await Promise.all(
				form.data.steps.map(async (s) => {
					let imagePath = '';
					if (s.image) {
						const { path } = await uploadImage(s.image);
						// TOOD: handle error
						imagePath = path;
					} else if (s.imageUrl) {
						imagePath = s.imageUrl.split('/').pop() ?? '';
					}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { imageUrl, ...data } = s;
					return { ...data, image: imagePath };
				})
			);

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { imageUrl, steps, ...data } = form.data;
			const { error: supabaseError } = await event.locals.supabase
				.from('howtos')
				.insert({ ...data, user_id: userId, image: imagePath, steps: stepsWithImages });

			if (supabaseError) {
				setFlash({ type: 'error', message: supabaseError.message }, event.cookies);
				return fail(500, withFiles({ message: supabaseError.message, form }));
			}

			return redirect(303, '/how-to');
		}),
};
