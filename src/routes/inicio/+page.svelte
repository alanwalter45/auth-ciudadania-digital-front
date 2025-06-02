<script lang="ts">
	import Prism from 'prismjs';
	import { page } from '$app/stores';
	import { URL_BACKEND } from '$lib/globals';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	const code: string = $page.url.searchParams.get('code') || '';
	const state: string = $page.url.searchParams.get('state') || '';
	let dataToken = { access_token: '', refresh_token: '', id_token: '' };
	let dataResolve = '';

	onMount(async () => {
		const tokenStorage: any = getTokenStorage();
		if (tokenStorage?.access_token) {
			({
				access_token: dataToken.access_token,
				id_token: dataToken.id_token,
				refresh_token: dataToken.refresh_token
			} = tokenStorage);
			return;
		}
		if (!URL_BACKEND || !code || !state) goto('/');
		await getToken(URL_BACKEND, code, state);
		if (!dataToken.access_token || !dataToken.id_token || !dataToken.refresh_token) goto('/');
	});

	async function getToken(url: string, code: string, state: string) {
		if (!url || !code || !state) return;
		const response = await fetch(`${url}/authorization?code=${code}&state=${state}`, {
			method: 'GET'
		});
		try {
			const result = await response.json();
			({
				access_token: dataToken.access_token,
				id_token: dataToken.id_token,
				refresh_token: dataToken.refresh_token
			} = result);
			saveTokenStorage(dataToken);
		} catch (_) {
			goto('/');
		}
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
		dataResolve = data;
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
		dataResolve = data;
	}

	async function refreshToken(url: string, refreshToken: string) {
		if (!url || !refreshToken) return;
		const response = await fetch(`${url}/refresh-token`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refreshToken })
		});
		const result = await response.json();
		({
			access_token: dataToken.access_token,
			id_token: dataToken.id_token,
			refresh_token: dataToken.refresh_token
		} = result);
		const data = JSON.stringify(result);
		dataResolve = data;
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

	function saveTokenStorage(obj: {}) {
		localStorage.setItem('token', JSON.stringify(obj));
	}
	function getTokenStorage(): {} {
		return JSON.parse(localStorage.getItem('token') || '{}');
	}
</script>

<section class="p-10 w-full">
	<h3 class="text-2xl">Autenticación</h3>
	<p class="pt-5">Operabilidad con la API - AGETIC.</p>
	<div class="pt-5"></div>
	<button
		on:click={() => getUserInfo(URL_BACKEND, dataToken.access_token)}
		disabled={!dataToken.access_token}
		class="bg-gray-50 rounded py-1 px-3 border border-black active:hover:bg-amber-600 disabled:text-gray-300 cursor-pointer hover:bg-white"
		>Información de Usuario</button
	>
	<button
		on:click={() => getIntrospection(URL_BACKEND, dataToken.access_token)}
		disabled={!dataToken.access_token}
		class="bg-gray-50 rounded py-1 px-3 border border-black active:hover:bg-amber-600 disabled:text-gray-300 cursor-pointer hover:bg-white"
		>Introspección</button
	>
	<button
		on:click={() => refreshToken(URL_BACKEND, dataToken.refresh_token)}
		disabled={!dataToken.refresh_token}
		class="bg-gray-50 rounded py-1 px-3 border border-black active:hover:bg-amber-600 disabled:text-gray-300 cursor-pointer hover:bg-white"
		>Refresh Token</button
	>
	<button
		on:click={() => logout(URL_BACKEND, dataToken.id_token)}
		disabled={!dataToken.id_token}
		class="bg-red-500 rounded py-1 px-3 border text-white border-black hover:bg-red-600 disabled:text-gray-300 disabled:bg-red-200 cursor-pointer"
		>Cerrar Sesión</button
	>
	<br />
	<section class="w-full">
		{#if dataResolve}
			<h3 class="mt-6">Respuesta</h3>
			<div
				class="whitespace-pre-wrap border bg-amber-50 border-gray-200 rounded-2xl p-3 wrap-break-word"
			>
				{@html Prism.highlight(dataResolve, Prism.languages['javascript'])}
			</div>
		{/if}
	</section>
</section>

<svelte:head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
		rel="stylesheet"
	/>
</svelte:head>
