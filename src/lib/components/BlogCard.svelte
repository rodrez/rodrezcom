<script lang="ts">
// import {format} from 'date-fns'
import type { Post } from "$lib/data/posts";

export let post: Post;

let isHovered = false;
</script>
<li class="list-none text-left h-full">
      <div
        class="anim relative rounded-md bg-slate-200 p-6 dark:bg-dark-background h-full"
      >
        <dl>
          <dt class="sr-only">Published on</dt>
          <dd class="text-xs font-medium text-gray-500 dark:text-gray-400">
            <!-- <time dateTime={post.date}>{format(post.date.toString(), "MM-dd-yyyy")}</time> -->
          </dd>
        </dl>
        <article class="flex flex-col space-y-2 xl:items-baseline xl:space-y-0">
          <div class="space-y-3 xl:col-span-3">
            <div>
              <a href={`blog/${post.category}${post.slug}`}>
                <h3
                  class={
                    `relative z-10 text-left text-2xl font-bold leading-8 tracking-tight ${isHovered && "text-amber-600 dark:text-amber-400"} `
                  }
                >
                  {post.title}
                </h3>
              </a>
              <div class="relative z-10 flex flex-wrap">
                <!-- {tags && tags.map((tag: any) => <Tag key={tag} text={tag} />)} -->
              </div>
            </div>
            <div class="prose max-w-none text-gray-500 dark:prose-invert dark:text-gray-400 ">
              {post.summary}
            </div>
          </div>
        </article>
        <button class="w-full flex justify-end absolute bottom-4 right-4">
          <!-- {isHovered && ( -->
          <!--   <Link href={`${url}`}> -->
          <!--     <TrailingArrows /> -->
          <!--   </Link> -->
          <!-- )} -->
        </button>
      </div>
    </li>
