<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import { base } from '$app/paths';
	import { BLOGS } from '$lib/params';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import type { Blog } from '$lib/utils/types';
	import { isBlank } from '@riadh-adrani/utils';	
	import { BlogCategory } from '$lib/utils/types';
	import BlogCard from '$lib/components/BlogCard/BlogCard.svelte';

	// get all of tags check for duplicates
	const tags = BLOGS.items.reduce((acc, curr) => {
		curr.tags.forEach((tag) => {
			if (!acc.includes(tag)) {
				acc.push(tag);
			}
		});
		return acc;
	}, []);

	const categories = Object.keys(BlogCategory);

	const { items, title } = BLOGS;

	let result: Array<Blog> = items;

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		result = items;

		const query = e.detail.search;
		const tag = e.detail.tag;
		const category = e.detail.category;

		if (!isBlank(query)) {
			result = items.filter((it) => it.name.toLowerCase().includes(query));
		}

		if(!isBlank(tag)) {
			result = result.filter((it) => it.tags.includes(tag));
		}

		if(!isBlank(category)) {
			const category_value = BlogCategory[category as keyof typeof BlogCategory];
			result = result.filter((it) => it.category === category_value);
		}

	};
</script>

<svelte:head>
	<meta name="title" content="Ali Bagheri's Blog"/>
	<meta name="type" content="website"/>
	<meta name="url" content="https://bagheriali.dev/blog"/>
	<meta name="site_name" content="Ali Bagheri - Software Engineer"/>
	<meta name="description" content="Ali Bagheri's blog"/>
	<meta name="author" content="Ali Bagheri"/>
	<meta name="robots" content="index, follow"/>
	<meta name="googlebot" content="index, follow"/>
	<meta name="google" content="notranslate"/>
</svelte:head>

<SearchPage {title} {tags} {categories} on:search={onSearch}>
	<div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3 lg:gap-5 mt-10">
		{#each result as blog (blog.slug)}
			<BlogCard blog={blog} />
		{/each}
	</div>
</SearchPage>


<style lang="scss">
</style>
