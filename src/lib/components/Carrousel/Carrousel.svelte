<script lang="ts">
	import { Icons } from '$lib/utils';
	import { onMount } from 'svelte';
	import Icon from '../Icon/Icon.svelte';
	import type { Skill } from '$lib/types';
	import { getAssetURL } from '$lib/data/assets';

	export let items: Array<Skill> = [];
	const delay = 2000;

	let element: HTMLElement;

	let timeout: unknown;
	let index = 0;
	let toRight = true;

	$: {
		if (element) {
			element.scroll({
				left: index * 150,
				behavior: 'smooth'
			});
		}
	}

	const slide = (right: boolean) => {
		if (right) {
			if (index < items.length - 1) {
				index = index + 1;
			} else {
				index = 0;
				// toRight = false;
			}
		} else {
			if (index > 0) {
				index = index - 1;
			} else {
				index = items.length - 1;
				// toRight = true;
			}
		}
	};

	const toggle = (right: boolean) => {
		clearTimeout(timeout as number);

		timeout = setTimeout(() => {
			slide(right);

			toggle(toRight);
		}, delay);
	};

	const toggleLeft = () => {
		clearTimeout(timeout as number);
		// toRight = false;
		slide(false);
		toggle(toRight);
	};

	const toggleRight = () => {
		clearTimeout(timeout as number);
		// toRight = true;
		slide(true);
		toggle(toRight);
	};

	onMount(() => {
		toggle(true);
	});
</script>

<div class="carrousel">
	<div class="carrousel-btn" role="button" tabindex="0" on:click={toggleLeft} on:keydown on:keyup on:keypress>
		<Icon icon={Icons.LeftArrow} size="20px" color={'var(--border-hover)'} />
	</div>

	<div bind:this={element} class="carrousel-content">
		{#each items as item}
			<div class="carrousel-item">
				<img class="carrousel-item-img" src={getAssetURL(item.logo)} alt={item.name} />
				<span class="carrousel-item-label">{item.name}</span>
			</div>
		{/each}
	</div>

	<div class="carrousel-btn" role="button" tabindex="0" on:click={toggleRight} on:keydown on:keyup on:keypress>
		<Icon icon={Icons.RightArrow} color={'var(--border-hover)'} size="20px" />
	</div>
</div>

<style lang="scss">
	.carrousel {
		flex: 0.5;
		display: flex;
		justify-content: center;
		align-items: center;

		&-content {
			display: flex;
			width: 150px;
			box-sizing: content-box;
			overflow: hidden;
		}

		&-item {
			box-sizing: content-box;
			width: 150px;
			padding: 15px;
			display: flex;
			flex-direction: column;
			align-items: center;

			&-img {
				height: 120px;
				width: 120px;

				max-width: initial;
			}

			&-label {
				text-align: center;
				margin-top: 20px;
			}
		}

		&-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 500;
			padding: 5px;
			margin: 0px 10px;
			cursor: pointer;
			border: 1px solid var(--border);
			border-radius: 50%;

			&:hover {
				border-color: var(--border-hover);
			}
		}
	}
</style>
