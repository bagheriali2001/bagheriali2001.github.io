<script>
	import Chip from '$lib/components/Chip/Chip.svelte';
	import CommonPage from '$lib/components/CommonPage.svelte';
	import { RESUME } from '$lib/params';

	const { item, title } = RESUME;
</script>

<svelte:head>
	<meta name="title" content="Ali Bagheri's Resume"/>
	<meta name="type" content="website"/>
	<meta name="url" content="https://bagheriali.dev/resume"/>
	<meta name="site_name" content="Ali Bagheri - Software Engineer"/>
	<meta name="description" content="Ali Bagheri's resume"/>
	<meta name="author" content="Ali Bagheri"/>
	<meta name="robots" content="index, follow"/>
	<meta name="googlebot" content="index, follow"/>
	<meta name="google" content="notranslate"/>
</svelte:head>

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
	}
</style>
