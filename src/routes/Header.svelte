<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	// import github from '$lib/images/github.svg';
	import {NavLinks} from '$lib/data/constants';
</script>

<header class="flex items-center justify-between px-32">
	<div class="corner">
		<a href="https://kit.svelte.dev">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<ul class="flex gap-x-8">
            {#each NavLinks as {name, url}}
			<li aria-current={$page.url.pathname === url ? 'page' : undefined}>
				<a href={url}>{name}</a>
			</li>
            {/each}
		</ul>
	</nav>

</header>

<style></style>
