<script lang="ts">
	import { page } from '$app/stores';
	import { URL_BACKEND } from '$lib/globals';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	const code: string = $page.url.searchParams.get('code') || '';
	const state: string = $page.url.searchParams.get('state') || '';
	let access_token = '';
	let refresh_token = '';
	let id_token = '';

	onMount(async () => {
		if (!URL_BACKEND || !code || !state) goto('/');
		await getToken(URL_BACKEND, code, state);
		if (!access_token || !id_token || !refresh_token) goto('/');
	});

	async function getToken(url: string, code: string, state: string) {
		if (!url || !code || !state) return;
		const response = await fetch(`${url}/authorization?code=${code}&state=${state}`, {
			method: 'GET'
		});
		const result = await response.json();
		access_token = result.access_token;
		id_token = result.id_token;
		refresh_token = result.refresh_token;
	}

	async function getUserInfo(url: string, token: string) {
		if (!url || !token) return;
		const response = await fetch(`${url}/information`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token })
		});
		const result = await response.json();
		const data = JSON.stringify(result);
		alert(data);
	}

	async function getIntrospection(url: string, token: string) {
		if (!url || !token) return;
		const response = await fetch(`${url}/introspection`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token })
		});
		const result = await response.json();
		const data = JSON.stringify(result);
		alert(data);
	}

	async function refreshToken(url: string, refreshToken: string) {
		if (!url || !refreshToken) return;
		const response = await fetch(`${url}/introspection`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refreshToken })
		});
		const result = await response.json();
		const data = JSON.stringify(result);
		access_token = result.access_token;
		id_token = result.id_token;
		refresh_token = result.refresh_token;
		alert(data);
	}

	async function logout(url: string, id_token: string) {
		if (!url || !id_token) return;
		const response = await fetch(`${url}/logout`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id_token_hint: id_token, post_logout_redirect_uri: `${url}` })
		});
		const result = await response.text();
		window.location.href = result;
	}
</script>

<section class="p-10">
	<h3 class="text-2xl">Autenticación GADCH</h3>
	<p class="pt-5">Inter-operabilidad con la API - AGETIC.</p>
	<div class="pt-5"></div>
	<button
		on:click={() => getUserInfo(URL_BACKEND, access_token)}
		disabled={!access_token}
		class="bg-gray-50 rounded py-1 px-3 border border-black active:hover:border-amber-600 disabled:text-gray-300"
		>Información de Usuario</button
	>
	<button
		on:click={() => getIntrospection(URL_BACKEND, access_token)}
		disabled={!access_token}
		class="bg-gray-50 rounded py-1 px-3 border border-black active:hover:border-amber-600 disabled:text-gray-300"
		>Introspección</button
	>
	<button
		on:click={() => refreshToken(URL_BACKEND, refresh_token)}
		disabled={!refresh_token}
		class="bg-gray-50 rounded py-1 px-3 border border-black active:hover:border-amber-600 disabled:text-gray-300"
		>Refresh Token</button
	>
	<button
		on:click={() => logout(URL_BACKEND, id_token)}
		disabled={!id_token}
		class="bg-red-500 rounded py-1 px-3 border text-gray-100 border-black hover:bg-red-600 disabled:text-gray-400 disabled:bg-red-200"
		>Cerrar Sesión</button
	>
</section>
