import { browser } from '$app/environment';
import { parse } from 'node-html-parser';
import { format } from 'date-fns';
import readingTime from 'reading-time';

// Since the post will be rendered server side throw error if browser
if (browser) {
	throw Error('posts must be rendered server side');
}

export const posts = Object.entries(import.meta.glob('/posts/**/*.{md, svx}', { eager: true }))
	.map(([filepath, post]) => {
		const html = parse(post.default.render().html);
		const preview = post.metadata.preview
			? parse(post.metadata.preview)
			: parse(html.querySelector('p'));

		return {
			...post.metadata,

			// creates the slug
			slug: filepath
				.replace(/(\/index)?\.md/, '')
				.split('/')
				.pop(),
			// TODO: Revisit this one, since we could have md or svx
			isIndexFile: filepath.endsWith('./index*'),
			date: post.metadata.data
				? format(addTimeZoneOffset(new Date(post.metadata.data)), 'MM-dd-yyyy')
				: undefined,
			// only text for seo
			preview: {
				html: preview.toString(),
				text: preview.structuredText ?? preview.toString()
			},
			readingTime: readingTime(html.structuredText).text
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.data).getTime())
	.map((post, index, allPosts) => ({
		...post,
		next: allPosts[index - 1],
		previous: allPosts[index + 1]
	}));

function addTimeZoneOffset(data) {
	const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
	return new Date(new Date().getTime() + offsetInMilliseconds);
}
