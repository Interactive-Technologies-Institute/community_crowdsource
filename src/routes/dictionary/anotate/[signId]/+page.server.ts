import type { Sign } from '@/types/types';
import { error } from "@sveltejs/kit";
import { setFlash } from "sveltekit-flash-message/server";

export const load = async (event) => {
    async function getSigns(): Promise<Sign[]> {
        const { data: dataSigns, error: signsError } = await event.locals.supabase
        .from('signs')
        .select('*')
        .order('theme', { ascending: true})
        .order('name', { ascending: true});

        if (signsError) {
            const errorMessage = 'Error fetching signs, please try again later.';
			setFlash({ type: 'error', message: errorMessage }, event.cookies);
			return error(500, errorMessage);
        }
        return dataSigns;
    }

    return {
        dataSigns: await getSigns()
    };
};