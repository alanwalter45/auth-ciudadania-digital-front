<script lang="ts">
	import { KeyRound } from '@lucide/svelte';
	import { URL_BACKEND } from '$lib/globals';
	import logo from '$lib/assets/img/ciudadania-digital.png';
	import { fade } from 'svelte/transition';

	async function getUrlAuthentication(url_backend: string) {
		const redirect_uri = `${url_backend}/welcome`;
		const response = await fetch(`${url_backend}/authentication?redirect_uri=${redirect_uri}`, {
			method: 'GET'
		});
		window.location.href = await response.text();
	}
</script>

<section transition:fade={{ duration: 1000 }} class="flex justify-center">
	<div class="flex flex-col items-center p-[6em]">
		<img src={logo} alt="Imagen de ciudadania-digital" class="w-48" />
		<button
			on:click={() => getUrlAuthentication(URL_BACKEND)}
			class="bg-gray-800 p-3 text-white font-bold rounded cursor-pointer hover:text-green-300 hover:bg-black w-xs flex justify-center gap-2"
		>
			<KeyRound /> Ingresar
		</button>
	</div>
	<div class="fixed bottom-0 p-2">
		<p title="Gobierno Autonomo Departamental de Chuquisaca"><span>GADCH</span>@2025</p>
	</div>
</section>
