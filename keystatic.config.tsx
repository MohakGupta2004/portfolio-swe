import { config, collection, fields } from '@keystatic/core';

// Local CMS. Posts are saved as MDX files in src/content/blog.
// Images pasted or dropped into a post are saved in public/images/posts.
export default config({
	storage: { kind: 'local' },
	collections: {
		blog: collection({
			label: 'Blog posts',
			path: 'src/content/blog/*',
			slugField: 'title',
			format: { contentField: 'content' },
			entryLayout: 'content',
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				description: fields.text({ label: 'Description', multiline: true }),
				date: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
				thumbnail: fields.text({
					label: 'Thumbnail path',
					description: 'Shown on hover in the blog list. Put the file in public/images/blogs, then type /images/blogs/<file>. Leave empty for none.',
				}),
				content: fields.mdx({
					label: 'Content',
					options: {
						image: {
							directory: 'public/images/posts',
							publicPath: '/images/posts/',
						},
					},
				}),
			},
		}),
	},
});
