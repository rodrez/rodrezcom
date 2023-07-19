// import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export async function load({ data }: PageLoad) {
	// const component = data.post.isIndexFile
	// 	? // vite requires relative paths and explicit file extensions for dynamic imports
	// 	  // see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
	// 	  await import(`../../../../posts/${data.post.slug}/index.md`)
	// 	: await import(`../../../../posts/${data.post.slug}.md`);
	//

	return {
		post: data.post,
		category: data.category
	};
}
