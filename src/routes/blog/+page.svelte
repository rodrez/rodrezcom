<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';

	export let data;
</script>

<div>
	<div class="my-12 2xl:my-20">
		<div class="space-y-2 pt-6 pb-8 md:space-y-5">
			<div class="flex w-full flex-col items-center justify-center gap-4">
				<h1
					class="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl"
				/>

				<div class="relative w-full md:w-[32rem]">
					<input
						aria-label="Search articles"
						type="text"
						placeholder="Search articles"
						class="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
					/>
					<svg
						class="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
			</div>
			<div class="flex flex-wrap gap-2 mx-auto justify-center">
				<!-- {tags.map((tag, index) => ( -->
				<!--   <div -->
				<!--     class="whitespace-nowrap rounded bg-slate-200 dark:bg-slate-600 px-2" -->
				<!--     key={index} -->
				<!--   > -->
				<!--     <Link -->
				<!--       class="hover:dark:text-primary-400 hover:text-primary-600 hover:font-semibold" -->
				<!--       href={`/tags/${tag.replace(/\s/g, "-")}`} -->
				<!--     > -->
				<!--       {tag} -->
				<!--     </Link> -->
				<!--   </div> -->
				<!-- ))} -->
			</div>
		</div>
		<ul
			class="mx-auto mt-6 mb-12 w-10/12 grid grid-cols-1 gap-4 max lg:grid-cols-2 xl:grid-cols-3 justify-center"
		>
			{#each data.posts as post}
				<BlogCard {post} />
			{/each}
		</ul>
	</div>
	<!-- {pagination && pagination.totalPages > 1 && !searchValue && ( -->
	<!--   <Pagination -->
	<!--     currentPage={pagination.currentPage} -->
	<!--     totalPages={pagination.totalPages} -->
	<!--   /> -->
	<!-- )} -->
</div>
