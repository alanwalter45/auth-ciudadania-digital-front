<script>
	let { children } = $props();
	import '../app.css';
</script>

<section class="flex justify-center">
	{@render children()}
	<div class="fixed bottom-0 p-2 bg-white left-0 w-full flex justify-center">
		<p title="Gobierno Autonomo Departamental de Chuquisaca"><span>GADCH</span>@2025</p>
	</div>
</section>
