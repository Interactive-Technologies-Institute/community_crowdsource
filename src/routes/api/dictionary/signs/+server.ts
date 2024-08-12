// src/routes/api/signs.ts
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals }) => {
    const searchQuery = url.searchParams.get('search') || '';

    // Construct the query based on whether there's a search query or not
    let query = locals.supabase.from('signs').select('*');

    if (searchQuery) {
        // Adjust the column name to match your schema
        query = query.ilike('name', `%${searchQuery}%`);
    }

    try {
        const { data: signs, error } = await query;

        if (error) {
            console.error('Error fetching signs:', error);
            return json({ error: 'Error fetching signs' }, { status: 500 });
        }

        return json({ signs });
    } catch (err) {
        console.error('Unexpected error:', err);
        return json({ error: 'Unexpected error' }, { status: 500 });
    }
};
