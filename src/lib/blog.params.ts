import type { Blog } from './utils/types';
import first_blog_post from './md/blog-posts/first-blog-post.md?raw';
import whats_idp_crawler from './md/blog-posts/whats-idp-crawler.md?raw';
import ssh_key_remote_connect_doesnt_work from './md/blog-posts/ssh-key-remote-connect-doesnt-work.md?raw';
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
	s({
		slug: 'whats-idp-crawler',
		tags: ['need', 'scraping'],
		category: BlogCategory.Dev,
		color: BlogCategoryColor.Dev,
		experiences: [],
		projects: ['idp-crawler'],
		description: 'What is IDP Crawler and why and how did I created it?',
		name: "What's IDP Crawler?",
		text: whats_idp_crawler,
		time: '2023-10-03',
		keywords: ['IDP', 'crawl', 'scrape', 'notification email', 'IELTS', 'test time'],
	}),
	s({
		slug: 'ssh-key-remote-connect-doesnt-work',
		tags: ['need', 'ssh', 'vps', 'debugging'],
		category: BlogCategory.Dev,
		color: BlogCategoryColor.Dev,
		experiences: [],
		projects: [],
		description: 'Why connecting to VPS using SSH public key needs a password?',
		name: "SSH Key Remote Connect doesn't Work",
		text: ssh_key_remote_connect_doesnt_work,
		time: '2023-11-30',
		keywords: ['ssh', 'ssh key based authentication', 'ssh key', 'ssh authentication', 'vps', 'remote connect'],
	}),
];

export default MY_BLOGS;

export const getBlogs = (...slugs: Array<string>): Array<Blog> =>
MY_BLOGS.filter((it) => slugs.includes(it.slug));
