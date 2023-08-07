<script>
	import Chip from '$lib/components/Chip/Chip.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import { RESUME } from '$lib/params';

	const { item, title } = RESUME;
</script>

<CommonPage {title}>
	<div class="resume">
		{#if item}
			<!-- <a href={item}> -->
				<!-- <Chip label="Download" size={'1.25em'} /> -->
				<!-- </a> -->
			<iframe src={item} style="border:none;" title="Resume" class="w-full h-[42rem]"></iframe>
		{:else}
			<Chip label="Ooops! no CV at the moment." />
		{/if}
	</div>
</CommonPage>

<style lang="scss">
	.resume {
		display: flex;
		justify-content: center;
		margin-top: 20px;

		& > a {
			color: inherit;
		}

		&-pdf {
			width: 100%;
			height: 100%;
		}
	}
</style>
