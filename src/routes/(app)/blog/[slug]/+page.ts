import MY_BLOGS from '$lib/blog.params';

export function load({ params }: { params: Record<string, string> }) {
	if (params.slug) {
		const blog = MY_BLOGS.find((item) => {
			return item.slug === params.slug;
		});

		return { blog };
	}
}
