import type { Blog } from './utils/types';
import first_blog_post from './md/blog-posts/first-blog-post.md?raw';
import { BlogCategory, BlogCategoryColor } from './utils/types';

const s = (blog: Blog) => blog;

export type ArrayElementType<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const MY_BLOGS = [
	s({
		slug: 'first-blog-post',
		tags: ['first-post', 'blog', 'personal-website'],
		category: BlogCategory.Dev,
		color: BlogCategoryColor.Dev,
		experiences: [],
		projects: ['personal-website'],
		description: 'Why did I developed blog on my personal website?',
		name: 'First Blog Post',
		text: first_blog_post,
		time: '2023-09-29',
		keywords: ['first post', 'blog', 'personal website'],
	}),
];

export default MY_BLOGS;

export const getBlogs = (...slugs: Array<string>): Array<Blog> =>
MY_BLOGS.filter((it) => slugs.includes(it.slug));
