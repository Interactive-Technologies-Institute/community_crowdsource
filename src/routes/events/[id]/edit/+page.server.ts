import { createEventSchema } from '@/schemas/event';
import { handleSignInRedirect } from '@/utils';
import type { StorageError } from '@supabase/storage-js';
import { error, fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { v4 as uuidv4 } from 'uuid';

export const load = async (event) => {
	const { session } = await event.locals.safeGetSession();
	if (!session) {
		return redirect(302, handleSignInRedirect(event));
	}

	async function getEvent(id: string) {
		const { data: eventData, error: eventError } = await event.locals.supabase
			.from('events')
			.select('*')
			.eq('id', id)
			.single();

		if (eventError) {
			const errorMessage = 'Error fetching event, please try again later.';
			setFlash({ type: 'error', message: errorMessage }, event.cookies);
			return error(500, errorMessage);
		}
		const imageUrl = event.locals.supabase.storage.from('events').getPublicUrl(eventData.image);
		return { ...eventData, image: undefined, imageUrl: imageUrl.data.publicUrl };
	}

	const eventData = await getEvent(event.params.id);

	return {
		updateForm: await superValidate(eventData, zod(createEventSchema), {
			id: 'update-event',
		}),
	};
};

export const actions = {
	default: async (event) => {
		const { session, user } = await event.locals.safeGetSession();
		if (!session || !user) {
			const errorMessage = 'Unauthorized.';
			setFlash({ type: 'error', message: errorMessage }, event.cookies);
			return error(401, errorMessage);
		}

		const form = await superValidate(event.request, zod(createEventSchema), { id: 'update-event' });

		if (!form.valid) {
			const errorMessage = 'Invalid form.';
			setFlash({ type: 'error', message: errorMessage }, event.cookies);
			return fail(400, withFiles({ message: errorMessage, form }));
		}

		async function uploadImage(image: File): Promise<{ path: string; error: StorageError | null }> {
			const fileExt = image.name.split('.').pop();
			const filePath = `${user?.id}_${uuidv4()}.${fileExt}`;

			const { data: imageFileData, error: imageFileError } = await event.locals.supabase.storage
				.from('events')
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

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { imageUrl, ...data } = form.data;
		const { error: supabaseError } = await event.locals.supabase
			.from('events')
			.update({ ...data, user_id: user.id, image: imagePath })
			.eq('id', event.params.id);

		if (supabaseError) {
			setFlash({ type: 'error', message: supabaseError.message }, event.cookies);
			return fail(500, withFiles({ message: supabaseError.message, form }));
		}

		return redirect(303, `/events/${event.params.id}`);
	},
};
