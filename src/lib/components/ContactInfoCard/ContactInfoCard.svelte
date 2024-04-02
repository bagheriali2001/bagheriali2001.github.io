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
		display_value: '',
		disabled: false,
	};

	let type: ProfileType =  profileTypes['Generic'];

	onMount(() => {
		el.style.setProperty('--size', 'auto');
		type = profileTypes[contact_info.type];
	});
</script>


<a
	bind:this={el}
	class="contact-info-card !no-underline px-4 text-[var(--light-0)] font-normal shadow-xl text-sm md:text-base
        {contact_info.disabled ? 'disabled' : ''}"
	style={`background-color: ${type.color}; box-shadow: 0 0 10px ${type.color}80; position: relative;`}
    href={contact_info.disabled ? 'javascript:void(0)' : type.link_format + contact_info.value}
>
		{#if contact_info.disabled}
			<div class="overlay">Not Active</div>
		{/if}
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
		transition-duration: 150ms;
		margin: 10px 12.5vw;
		padding: 7px 10px;
		overflow: hidden;
	}

	.disabled:before {
		border: 1px solid var(--border);
		border-radius: 20px;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.6;
	}

	.disabled {
		cursor: not-allowed;
	}

	.overlay {
		position: absolute;
		top: 11%;
		left: 0;
		width: 100%;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		transform: rotate(-5deg);
	}
</style>
