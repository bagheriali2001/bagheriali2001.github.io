<script lang="ts">
	import Card from '$lib/components/Card/Card.svelte';
	import { base } from '$app/paths';
	import { SKILLS } from '$lib/params';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import type { Skill } from '$lib/types';
	import { isBlank } from '@riadh-adrani/utils';
	import { getAssetURL } from '$lib/data/assets';

	const { items, title } = SKILLS;

	let result: Array<Skill> = items;

	const onSearch = (e: CustomEvent<{ search: string }>) => {
		const query = e.detail.search;

		if (isBlank(query)) {
			result = items;
		}

		result = items.filter((it) => it.name.toLowerCase().includes(query));
	};
</script>

<svelte:head>
	<meta name="title" content="Ali Bagheri's Skills"/>
	<meta name="type" content="website"/>
	<meta name="url" content="https://bagheriali.dev/skills"/>
	<meta name="site_name" content="Ali Bagheri - Software Engineer"/>
	<meta name="description" content="Ali Bagheri's skills"/>
	<meta name="author" content="Ali Bagheri"/>
	<meta name="robots" content="index, follow"/>
	<meta name="googlebot" content="index, follow"/>
	<meta name="google" content="notranslate"/>
</svelte:head>

<SearchPage {title} on:search={onSearch}>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-5 mt-10">
		{#each result as skill (skill.slug)}
			<Card
				color={skill.color}
				classes={['cursor-pointer']}
				tiltDegree={1}
				href={`${base}/skills/${skill.slug}`}
				bgImg={getAssetURL(skill.logo)}
			>
				<p class="text-[var(--tertiary-text)]">{skill.name}</p>
			</Card>
		{/each}
	</div>
</SearchPage>
