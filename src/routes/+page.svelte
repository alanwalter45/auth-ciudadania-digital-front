<script lang="ts">
	import { KeyRound } from '@lucide/svelte';
	import { URL } from '$lib/globals';
	import logo from "$lib/assets/img/ciudadania-digital.png";

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
		<img
			src="{logo}"
			alt="Imagen de ciudadania-digital"
			class="w-52"
		/>
		<button
			onclick={getUrlAuthentication(URL)}
			class="bg-gray-600 p-3 text-amber-50 rounded cursor-pointer hover:bg-gray-700 hover:text-orange-100 w-sm flex justify-center gap-2"
		>
			<KeyRound /> Ingresar
		</button>
	</div>
</section>
