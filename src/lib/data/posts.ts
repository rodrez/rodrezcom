import { browser } from '$app/environment';
import { parse } from 'node-html-parser';
import { format } from 'date-fns';
import readingTime from 'reading-time';

// Since the post will be rendered server side throw error if browser
if (browser) {
	throw Error('posts must be rendered server side');
}

export type Post = {
	title: string;
	isDraft: boolean;
	summary: string;
	tags: string[];
	canonicalUrl: string;
	category: string;
	slug: string;
	isIndexFile: boolean;
	date: Date;
	preview: string;
	readingTime: string;
};

const getCategories = () => {
	const filepaths: string[][] = Object.keys(
		import.meta.glob('/posts/**/**/*.{md,svx}', { eager: true })
	).map((fp) => {
		const splittedPath = fp.split('/');
		return splittedPath.slice(2, splittedPath.length);
	});

	const categories = new Set();

	// The expected structure for these categories will be always
	// the part after the posts, since that is the designated category
	// directory
	for (let i = 0; i < filepaths.length; i++) {
		const cat = filepaths[i];

		// If there is 1 or less that means theres no categories
		if (cat.length <= 1) continue;

		const notFile = cat[1].endsWith('.md') || cat[1].endsWith('.svx');
		if (notFile) {
			categories.add(cat[0]);
		}
	}

	return Array.from(categories);
};

export const categories = getCategories();

export const posts: Post[] = Object.entries(
	import.meta.glob('/posts/**/**/*.{md,svx}', { eager: true })
)
	.map(([filepath, post]: [string, any]) => {
		const html = parse(post.default.render().html);
		const preview = post.metadata.preview
			? parse(post.metadata.preview)
			: parse(html.querySelector('p'));

		const pathArray = filepath.split('/');
		let category;
		if ((pathArray.length > 1 && pathArray[2].endsWith('svx')) || pathArray[2].endsWith('md')) {
			category = '';
		} else {
			category = pathArray[2] + '/';
		}

		return {
			...post.metadata,

			// creates the slug
			slug: filepath
				.replace(/(\/index)?\.(md|svx)/, '')
				.split('/')
				.pop(),
			category: category,
			// TODO: Revisit this one, since we could have md or svx
			isIndexFile: filepath.endsWith('./index.md') || filepath.endsWith('./index.svx'),
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

function addTimeZoneOffset(date: Date) {
	const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
	return new Date(new Date(date).getTime() + offsetInMilliseconds);
}
