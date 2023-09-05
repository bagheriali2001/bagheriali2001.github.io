<!-- add a footer sticked to bottom of the page with a text at the left of it "Thanks @RiadhAdrani for the awesome template" with github logo linking to https://github.com/RiadhAdrani/slick-portfolio-svelte -->

<script lang="ts">
	// import type { NavMenuItem } from '$lib/utils/types';
	import Icon from '../Icon/Icon.svelte';
	import { Icons } from '$lib/utils';
    import CardHorizontalDivider from '../Card/CardHorizontalDivider.svelte';

</script>

<div class="footer-div">
    <span class="footer-div-item">
        <span class="footer-div-item-label">Heavily inspired by</span>
        <a href="https://github.com/RiadhAdrani/slick-portfolio-svelte" target="_blank">
            <Icon icon={Icons.GitHub} size="20px" />
        </a>
        <CardHorizontalDivider />
        <span class="footer-div-item-label">Thanks @RiadhAdrani for the awesome template</span>
        
    </span>
</div>

<style lang="scss">
	.footer-div {
		display: flex;
		justify-content: center;
		position: sticky;
		top: 0px;
		z-index: 10;
		padding: 0px 10px;
		border-bottom: 1px solid var(--secondary);
		background-color: var(--main);

		&-item {
			display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 0px;
            color: var(--secondary-text);
            font-size: 0.9em;
            font-weight: 200;
		}
	}
</style>
