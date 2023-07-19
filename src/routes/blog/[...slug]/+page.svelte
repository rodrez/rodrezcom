<script lang="ts">
    // import type {PageLoad} from './$types';
    export let data;
</script>

{#if data.category}
	<p>Render Category Page</p>
     {JSON.stringify(data, null, 2)}
{:else}
	<p>Post</p>
	<pre> 
     {JSON.stringify(data, null, 2)}
<!-- <h1>{data.title} </h1> -->
<!-- <p> {@html data.content}</p> -->

     </pre>
{/if}
