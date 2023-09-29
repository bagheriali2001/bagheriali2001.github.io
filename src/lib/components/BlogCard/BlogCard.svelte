<script lang="ts">
	import type { Blog } from '$lib/types';
	import { base } from '$app/paths';
	import Card from '../Card/Card.svelte';
	import CardTitle from '../Card/CardTitle.svelte';
	import Chip from '../Chip/Chip.svelte';
	import { BlogCategory } from '$lib/utils/types';

	export let blog: Blog;
</script>

<Card margin="0px 0px 20px 0px" tiltDegree={2} color="#ffffff" href={`${base}/blog/${blog.slug}`}>
	<div class="blog">
		<div class="blog-data">
			<h3 class="blog-title">
				<CardTitle title={blog.name} />
				<div class="blog-title-divider" />
				<Chip label={Object.keys(BlogCategory).find((key) => BlogCategory[key] === blog.category)} size="0.75em" />
			</h3>
			<div class="blog-tags">
				{#each blog.tags as tag}
					<Chip label={tag} size="0.75em" margin="margin: 2.5px 5px 2.5px 0px;" />
				{/each}
			</div>
			<div class="blog-time">{blog.time}</div>
			<div class="blog-description">{blog.description}</div>
		</div>
	</div>
</Card>

<style lang="scss">
	.blog {
		display: flex;
		align-items: flex-start;

		&-data {
			display: flex;
			flex-direction: column;
			margin-left: 20px;
		}

		@media (max-width: 800px) {
			flex-direction: column;

			&-data {
				margin-left: 0px;
			}
		}

		&-title {
			margin: 0;
			display: flex;
			align-items: center;

			&-divider {
				width: 10px;
			}

			@media (max-width: 800px) {
				& {
					align-items: center;
					margin: 5px 0px;
				}
			}
		}

		&-time {
			color: var(--accent-text);
			font-size: 0.9em;
			margin-top: 5px;
			margin-bottom: 5px;
		}

		&-description {
			margin-bottom: 20px;
		}

		&-tags {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
