<script lang="ts">
	import CardDivider from '$lib/components/Card/CardDivider.svelte';
	import CardLogo from '$lib/components/Card/CardLogo.svelte';
	import MainTitle from '$lib/components/MainTitle/MainTitle.svelte';
	import MY_EXPERIENCES from '$lib/experiences.params';
	import MY_PROJECTS from '$lib/projects.params';

	import { base } from '$app/paths';
	import type { Blog } from '$lib/utils/types';
	import { getAssetURL } from '$lib/data/assets';
	import { BLOGS } from '$lib/params';
	import { isBlank } from '@riadh-adrani/utils';
	import Markdown from '$lib/components/Markdown.svelte';
	import TabTitle from '$lib/components/TabTitle.svelte';

	import { onMount } from 'svelte';
  	import { generateUniqueID } from '$lib/utils/unique_id';

	import { BlogCategory } from '$lib/utils/types';

	let isLiked = false;
	let uniqueId;
	let api_data = {};
	onMount(async () => {
		if (localStorage.getItem('uniqueId')) {
			// If the unique ID is already in local storage, use it
			uniqueId = localStorage.getItem('uniqueId');
		} else {
			// Generate the unique ID when the component mounts
			uniqueId = generateUniqueID();
			// store the unique ID in local storage
			localStorage.setItem('uniqueId', uniqueId);
		}

		// fetch the data from the API
		const api_data_raw = await fetch(`/api/blog?slug=${data.blog.slug}&user_unique_id=${uniqueId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		api_data = await api_data_raw.json();
		isLiked = api_data.liked;
	});


	type Related = { display: string; name: string; img: string; type: 'projects' | 'experience' };

	export let data: { blog?: Blog };

	const { title } = BLOGS;

	const getRelations = (): Array<Related> => {
		const out: Array<Related> = [];

		const blog = data.blog;

		if (!blog) {
			return [];
		}

		blog.experiences.forEach((item) => {
			const exp = MY_EXPERIENCES.find((exp) => exp.slug === item);
			if (exp) {
				out.push({
					img: getAssetURL(exp.logo),
					display: `${exp.name} @ ${exp.company}`,
					name: exp.name,
					type: 'experience'
				});
			}
		});

		blog.projects.forEach((item) => {
			const proj = MY_PROJECTS.find((proj) => proj.slug === item);
			if (proj) {
				out.push({
					img: getAssetURL(proj.logo),
					display: `${proj.name} (${proj.type})`,
					name: proj.name,
					type: 'projects'
				});
			}
		});

		return out;
	};

	$: computedTitle = data.blog ? `${data.blog.name} - ${title}` : title;

	$: related = data.blog ? getRelations() : [];

	// handle the like button
	const handleLike = async () => {
		await fetch(`/api/blog?postVisit_id=${api_data.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ is_liked: !isLiked })
		});
		isLiked = !isLiked;
	}
</script>

<svelte:head>
	<meta name="description" content="This is where the description goes for SEO" />

	<meta name="title" content="Ali Bagheri"/>
	<meta name="type" content="website"/>
	<meta name="url" content="https://bagheriali.dev/blog/{data.blog.slug}"/>
	<meta name="site_name" content="Ali Bagheri - Software Engineer"/>
	<meta name="description" content="Ali Bagheri's blog"/>
	<meta name="keywords" content={data.blog.keywords.join(', ')}/>
	<meta name="author" content="Ali Bagheri"/>
	<meta name="robots" content="index, follow"/>
	<meta name="googlebot" content="index, follow"/>
	<meta name="google" content="notranslate"/>
</svelte:head>

<TabTitle title={computedTitle} />

<div class="pb-10 overflow-x-hidden">
	{#if data.blog === undefined}
		<div>Could not load blog data.</div>
	{:else}
		<div class="flex flex-col items-center overflow-x-hidden">
			<div
				style={`background: ${data.blog.color};background: linear-gradient(230deg, ${data.blog.color} 0%, var(--main-60) 40%, var(--main) 100%);`}
				class="flex flex-row w-[100%] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] items-center px-4 md:px-10 relative mb-4"
			>
				<MainTitle>{data.blog.name}</MainTitle>

				<div class="flex flex-row gap-2 absolute bottom-2 left-2">

					<div class="border rounded border-[color:var(--border)] px-2.5 py-1 text-[var(--tertiary-text)]">
						<a class="flex flex-row items-center" href={`${base}/blog?category=${Object.keys(BlogCategory).find(key => BlogCategory[key] === data.blog.category)}`}>
							<span class="text-[0.9em] font-bold">{Object.keys(BlogCategory).find(key => BlogCategory[key] === data.blog.category)}</span>
						</a>
					</div> 
					{#each data.blog.tags as tag}
						<div class="border rounded border-[color:var(--border)] px-2.5 py-1 text-[var(--tertiary-text)]">
							<a class="flex flex-row items-center" href={`${base}/blog?tag=${tag}`}>
								<span class="text-[0.9em]">#{tag}</span>
							</a>
						</div>
					{/each}
				</div>
				<div class="flex flex-col absolute bottom-3 right-3 gap-2 items-center">
					<label class="like_container">
						<input bind:checked={api_data.liked} type="checkbox" on:change={handleLike} />
						<div class="checkmark">
						  <svg viewBox="0 0 256 256">
						  <rect fill="none" height="256" width="256"></rect>
						  <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path></svg>
						</div>
					</label>
					
				</div>
			</div>
			<div class="px-4 py-3 overflow-x-hidden w-full">
				{#if isBlank(data.blog.text)}
					<p class="text-[var(--tertiary-text)]">This place is yet to be filled...</p>
				{:else}
					<Markdown content={data.blog.text} />
				{/if}
			</div>
			<div class="self-stretch mb-3">
				<CardDivider />
			</div>
			<div class="flex flex-row px-4 gap-2 self-stretch flex-wrap ">
				{#each related as item}
					<div
						class="border rounded border-[color:var(--border)] px-2.5 py-1 text-[var(--tertiary-text)]"
					>
						<a class="flex flex-row items-center" href={`${base}/${item.type}?q=${item.name}`}>
							<CardLogo src={item.img} alt={item.name} radius={'0px'} size={17} classes="mr-2" />
							<span class="text-[0.9em]">{item.display}</span>
						</a>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>


<style lang="scss">
.like_container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.like_container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  user-select: none;
  transition: 100ms;
}

.checkmark {
  top: 0;
  left: 0;
  height: 2em;
  width: 2em;
  transition: 100ms;
  animation: dislike_effect 400ms ease;
}

.like_container input:checked ~ .checkmark path {
  fill: #FF5353;
  stroke-width: 0;
}

.like_container input:checked ~ .checkmark {
  animation: like_effect 400ms ease;
}

.like_container:hover {
  transform: scale(1.1);
}

@keyframes like_effect {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes dislike_effect {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>



