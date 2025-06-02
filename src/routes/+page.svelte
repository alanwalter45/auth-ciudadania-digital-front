<script lang="ts">
	import { KeyRound } from '@lucide/svelte';
	import { URL_BACKEND, URL_FRONTEND } from '$lib/globals';
	import logo from '$lib/assets/img/ciudadania-digital.png';

	async function getUrlAuthentication(url_backend: string, redirect_uri: string) {
		const response = await fetch(`${url_backend}/authentication?redirect_uri=${redirect_uri}`, {
			method: 'GET'
		});
		window.location.href = await response.text();
	}
</script>

<div class="flex flex-col items-center p-[6em]">
	<img src={logo} alt="Imagen de ciudadania-digital" class="w-48" />
	<button
		on:click={() => getUrlAuthentication(URL_BACKEND,`${URL_FRONTEND}/inicio`)}
		class="bg-gray-800 p-3 text-white font-bold rounded cursor-pointer hover:text-white hover:bg-orange-600 w-xs flex justify-center gap-2"
	>
		<KeyRound /> Ingresar
	</button>
	<a href="/politicas" class="text-blue-950 mt-6 hover:underline">Políticas de privacidad</a>
</div>
<div class="fixed bottom-0 p-2 bg-white left-0 w-full flex justify-center">
	<p title="Gobierno Autonomo Departamental de Chuquisaca"><span>GADCH</span>@2025</p>
</div>
