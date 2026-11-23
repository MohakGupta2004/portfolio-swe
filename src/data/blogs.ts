import { getCollection } from 'astro:content';

// Turns a date into 19.APR.2026.
function formatDate(date: Date) {
	const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

	const day = String(date.getUTCDate()).padStart(2, '0');
	const month = months[date.getUTCMonth()];
	const year = date.getUTCFullYear();

	return `${day}.${month}.${year}`;
}

// All blogs from src/content/blog, newest first.
export async function getBlogs() {
	const posts = await getCollection('blog');

	posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	const blogs = [];
	for (const post of posts) {
		blogs.push({
			title: post.data.title,
			date: formatDate(post.data.date),
			slug: post.id,
			thumbnail: post.data.thumbnail,
		});
	}

	return blogs;
}
