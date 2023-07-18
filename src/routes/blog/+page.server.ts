import { posts } from '$lib/data/posts';
import type { PageLoad } from '../$types';
import { error } from '@sveltejs/kit';

export const load = (({ params }) => {
	// Paginate to 6 post per page
	// add prev or next to pagination
	if (!posts) {
		throw error(404, 'Post not found');
	}

	return {
		posts
	};
}) satisfies PageLoad;
