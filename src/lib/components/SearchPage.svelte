<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import CommonPage from './CommonPage.svelte';
	import Input from './Input/Input.svelte';
	import DropDown from './DropDown/DropDown.svelte';
	import { browser } from '$app/environment';

	export let title = 'Title';
	export let search = '';
	export let tags: Array<String> = [];
	export let tag = '';
	export let categories: Array<String> = [];
	export let category = '';

	const dispatch = createEventDispatcher();

	let mounted = false;

	$: {
		dispatch('search', { search: search.trim().toLowerCase(), tag, category });
	}

	$: {
		if (browser && mounted) {
			let searchParams = new URLSearchParams(window.location.search);

			if(search.trim().length > 0) {
				searchParams.set('q', search);
			} else {
				searchParams.delete('q');
			}
			
			if(tag.trim().length > 0) {
				searchParams.set('tag', tag);
			} else {
				searchParams.delete('tag');
			}
			
			if(category.trim().length > 0) {
				searchParams.set('category', category);
			} else {
				searchParams.delete('category');
			}

			const url = `${window.location.protocol}//${window.location.host}${
				window.location.pathname
			}${searchParams.toString().length > 0 ? `?${searchParams.toString()}` : ''}`;

			const state = window.history.state;

			window.history.replaceState(state, '', url);
		}
	}

	onMount(() => {
		let searchParams = new URLSearchParams(window.location.search);

		search = searchParams.get('q') ?? '';
		tag = searchParams.get('tag') ?? '';
		category = searchParams.get('category') ?? '';
		mounted = true;
	});
</script>

<CommonPage {title}>
	<div class="w-100% grid grid-cols-4 gap-2 md:gap-3 lg:gap-5 mt-10">
		<!-- if both tags and categories exists, col-span-2 if one exists col-span-3 if non col-span-4 -->
		<div class={tags && tags.length ? (categories && categories.length > 0 ? 'lg:col-span-2 col-span-4' : 'col-span-3') : (categories && categories.length > 0 ? 'col-span-3' : 'col-span-4')}>
			<Input bind:value={search} custom_class={"w-full"} placeholder={'Search ...'} />
		</div>

		{#if tags && tags.length > 0}
			<div class={categories && categories.length > 0 ? 'col-span-2 lg:col-span-1' : 'col-span-1'}>
				<DropDown bind:value={tag} placeholder={'Tag ...'} items_list={tags} />
			</div>
		{/if}

		{#if categories && categories.length > 0}
			<div class={tags && tags.length > 0 ? 'col-span-2 lg:col-span-1' : 'col-span-1'}>
				<DropDown bind:value={category} placeholder={'Category ...'} items_list={categories} />
			</div>
		{/if}
	</div>
	<div class="w-100% flex flex-col">
		<slot />
	</div>
</CommonPage>
