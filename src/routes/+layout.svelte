<script>
	let { children } = $props();
	import '../app.css';
	import { fade } from 'svelte/transition';
	import { page as p } from '$app/stores';
</script>

{#key $p.url.pathname}
	<section transition:fade={{ duration: 300 }} class="flex justify-center">
		{@render children()}
	</section>
{/key}
