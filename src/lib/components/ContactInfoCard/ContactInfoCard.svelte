<script lang="ts">
	import { onMount } from 'svelte';
	import profileTypes from '$lib/data/profile_types';
	import type { ProfileType, ContactInformation } from '$lib/utils/types';
	import Icon from '../Icon/Icon.svelte';

	let el: HTMLElement;

	export let contact_info: ContactInformation = {
		name: 'Generic',
		slug: 'Generic',
		type: 'Generic',
		value: 'Generic',
	};

	let type: ProfileType =  profileTypes['Generic'];

	onMount(() => {
		el.style.setProperty('--size', 'auto');
		type = profileTypes[contact_info.type];
	});
</script>


<a
	bind:this={el}
	class="contact-info-card !no-underline px-4 text-[var(--light-0)] font-normal shadow-xl text-sm md:text-base"
	style={`background-color: ${type.color}; box-shadow: 0 0 10px ${type.color}80;`}
	href={type.link_format + contact_info.value}
>
		<Icon icon={type.icon} size="24px" color="white" />
	
		{#if contact_info.display_value}
			<span class="ml-0.5">{contact_info.display_value}</span>
		{:else}
			<span class="ml-0.5">{contact_info.value}</span>
		{/if}
</a>

<style lang="scss">
	.contact-info-card {
		--size: auto;
		display: inline-block;
		border: 1px solid var(--border);
		border-radius: 20px;
		cursor: pointer;
		// font-size: 1rem;
		transition-duration: 150ms;
		margin: 10px 12.5vw;
		padding: 7px 10px;


	}
</style>
