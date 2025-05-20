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

	function informacionUsuario() {
		alert('no implementado');
	}

	function introspeccion() {
		alert('no implementado');
	}

	function cerrarSesion() {
		alert('no implementado');
	}
</script>

<section class="p-10">
	<h3 class="text-2xl">Autenticación GADCH</h3>
	<p class="pt-5">Página para verificar conexión con la API de la AGETIC.</p>
	{#await getToken(URL, code, state) then x}
		{x}
	{/await}
	<div class="pt-5"></div>
	<button
		onclick={informacionUsuario}
		class="bg-gray-50 rounded py-1 px-3 border border-black hover:border-amber-600"
		>Información de Usuario</button
	>
	<button
		onclick={introspeccion}
		class="bg-gray-50 rounded py-1 px-3 border border-black hover:border-amber-600"
		>Introspección</button
	>
	<button
		onclick={cerrarSesion}
		class="bg-red-500 rounded py-1 px-3 border text-gray-100 border-black hover:bg-red-600"
		>Cerrar Sesión</button
	>
</section>
