import { posts } from '$lib/data/posts';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const { slug } = params;

	const splittedSlug = slug.split('/');
	let post;

	if (splittedSlug.length > 1) {
		const postSlug = splittedSlug[1];
		const cat = splittedSlug[0];
		post = posts.find((post) => postSlug === post.slug && cat + '/' === post.category);
	} else {
		post = posts.find((post) => slug === post.slug);
	}
	// get post with metadata

	if (!post) {
		// throw error(404, 'Post not found');
	}

	return {
		post
	};
}) satisfies PageLoad;
