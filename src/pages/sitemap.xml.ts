import { getCollection } from 'astro:content';

const site = 'https://mohakgupta.in';
const pages = ['/', '/blog', '/projects', '/work', '/favourites'];

export async function GET() {
	const posts = await getCollection('blog');

	let urls = '';

	for (const page of pages) {
		urls = urls + `<url><loc>${site}${page}</loc></url>\n`;
	}

	for (const post of posts) {
		const date = post.data.date.toISOString().slice(0, 10);
		urls = urls + `<url><loc>${site}/blog/${post.id}</loc><lastmod>${date}</lastmod></url>\n`;
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>\n`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
