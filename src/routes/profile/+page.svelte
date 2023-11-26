<script lang="ts">
	import ContactInfoCard from '$lib/components/ContactInfoCard/ContactInfoCard.svelte';
	import type { Profile } from '$lib/utils/types';

	import CommonPage from '$lib/components/CommonPage.svelte';
	import { onMount } from 'svelte';

	let profile_data: Profile = {
		profile_picture: "",
        "full_name": "Ali Bagheri",
        "intro_text": "Hi, this is Ali Bagheri. If you want to contact me, you can use the contact information below.",
        "contact_info": [
            {
                "name": "Email Address",
                "slug": "email_address",
                "type": "Email",
                "value": "bagheriali2001@gmail.com"
            }
        ]
	}

	onMount(async () => {
		// read pass_key from query params
		const urlParams = new URLSearchParams(window.location.search);
		const pass_key = urlParams.get('pass_key');

		const api_data_raw = await fetch(`/api/profile_api?pass_key=${pass_key}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});
		profile_data = await api_data_raw.json();
	});
</script>

<svelte:head>
	<meta name="title" content="Ali Bagheri's Profile"/>
	<meta name="type" content="website"/>
	<meta name="url" content="https://bagheriali.dev/profile"/>
	<meta name="site_name" content="Ali Bagheri - Software Engineer"/>
	<meta name="description" content="Ali Bagheri's Profile"/>
	<meta name="author" content="Ali Bagheri"/>
	<meta name="robots" content="noindex, nofollow"/>
	<meta name="googlebot" content="noindex, nofollow"/>
</svelte:head>

<CommonPage title="Profile" showTitle={false}>
	<div class="profile_section">
		<!-- if there is profile_data.profile_picture then show the image, else don't show -->
		{#if profile_data.profile_picture}
			<img class="profile_picture shadow-inner mx-[5vw]" src={profile_data.profile_picture} alt={profile_data.name + "'s profile picture"} />
		{/if}
		{#if profile_data.full_name}
			<h1 class="text-3xl font-bold mb-4 mx-[5vw]">{profile_data.full_name}</h1>
		{/if}
		{#if profile_data.intro_text}
			<p class="text-sm mb-2 mx-[5vw]">{profile_data.intro_text}</p>
		{/if}
		{#if profile_data.contact_info && profile_data.contact_info.length > 0}
		<div class="flex justify-center flex-col">
			{#each profile_data.contact_info as contact_info}
				<ContactInfoCard
					{contact_info}
				/>
			{/each}
		</div>
		{/if}
</CommonPage>

<style lang="scss">
	.profile_section {
		// center all the text
		text-align: center;
		
		& > .profile_picture {
			width: 150px;
			height: 150px;
			border-radius: 50%;
			object-fit: cover;
			margin: 0 auto;
			display: block;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
			margin-bottom: 20px;
		}
	}



	// .projects-list {
	// 	display: grid;
	// 	grid-template-columns: repeat(3, 1fr);
	// 	gap: 20px;

	// 	@media (max-width: 1350px) {
	// 		grid-template-columns: repeat(2, 1fr);
	// 	}
	// 	@media (max-width: 850px) {
	// 		grid-template-columns: repeat(1, 1fr);
	// 	}
	// }
</style>
