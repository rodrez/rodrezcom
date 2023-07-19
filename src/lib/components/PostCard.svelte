
    <>
      <div className="my-12 2xl:my-20">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl">
              {title === "Dsa" ? "Data Structures and Algorithms" : title}
            </h1>

            <div className="relative w-full md:w-[32rem] ">
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          {/* tags */}
          <div className="flex flex-wrap gap-2 mx-auto justify-center">
            {tags.map((tag, index) => (
              <div
                className="whitespace-nowrap rounded bg-slate-200 dark:bg-slate-600 px-2"
                key={index}
              >
                <Link
                  className="hover:dark:text-primary-400 hover:text-primary-600 hover:font-semibold"
                  href={`/tags/${tag.replace(/\s/g, "-")}`}
                >
                  {tag}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <ul className="mx-auto mt-6 mb-12 w-10/12 grid grid-cols-1 gap-4 max lg:grid-cols-2 xl:grid-cols-3 justify-center">
          {!filteredBlogPosts.length && "No posts found."}
          {transition((style, post) => (
            <animated.div style={style} className="" key={post.slug}>
              <BlogCard post={post} />
            </animated.div>
          ))}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </>
