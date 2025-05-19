<script lang="ts">
	import { page } from '$app/stores';
	import { URL } from '$lib/globals';

	const code: string = $page.url.searchParams.get('code') || '';
	const state: string = $page.url.searchParams.get('state') || '';

	async function getToken(url: string, code: string, state: string) {
		if (!code || !state) return;
		const response = await fetch(`${URL}/authorization?code=${code}&state=${state}`, {
			method: 'GET'
		});
		return await response.text();
	}
</script>

<section class="p-10">
	<h3 class="text-2xl">Sistema A.I.P</h3>
	{code}
	<br />
	{state}
	<br />
	{#await getToken(URL,code,state) then x}
		{x}
	{/await}
</section>
