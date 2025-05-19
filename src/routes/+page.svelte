<script lang="ts">
	import { KeyRound } from '@lucide/svelte';
	import { URL } from '$lib/globals';

	async function getUrlAuthentication(url: string) {
		const redirect_uri = `${URL}/inicio`;
		const response = await fetch(`${URL}/authentication?redirect_uri=${redirect_uri}`, {
			method: 'GET'
		});
		window.location.href = await response.text();
	}
</script>

<section class="flex justify-center">
	<div class="flex flex-col items-center p-[6em]">
		<h1 class="text-2xl uppercase">Autenticación</h1>
		<img
			src="src/assets/img/ciudadania-digital.png"
			alt="Imagen de ciudadania-digital"
			class="w-52"
		/>
		<button
			onclick={getUrlAuthentication(URL)}
			class="bg-gray-600 p-5 text-amber-50 rounded cursor-pointer hover:bg-amber-500 hover:text-black w-sm flex justify-center gap-2"
		>
			<KeyRound /> Ingresar
		</button>
	</div>
</section>
