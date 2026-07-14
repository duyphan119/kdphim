const name = "watchedMovies";

export const watchedMoviesApi = {
  create: (newItem: T_WatchedMovie) => {
    const movies: T_WatchedMovie[] = JSON.parse(localStorage.getItem(name)!);

    if (movies) {
      const index = movies.findIndex(({ slug }) => slug === newItem.slug);

      if (index === -1) {
        movies.unshift(newItem);
      } else {
        movies[index].server_index = newItem.server_index;
        movies[index].episode_name = newItem.episode_name;
        movies[index].episode_slug = newItem.episode_slug;
      }
    }

    console.log(newItem);
    localStorage.setItem(name, JSON.stringify(movies || [newItem]));
  },
  delete: (slug: string) => {
    const videos: T_WatchedMovie[] = JSON.parse(localStorage.getItem(name)!);

    localStorage.setItem(
      name,
      JSON.stringify(videos.filter((item) => item.slug !== slug)),
    );
  },
  items: ({
    page,
    limit,
  }: {
    page?: string;
    limit?: string;
  }): { items: T_WatchedMovie[]; pagination?: T_Pagination } => {
    const movies: T_WatchedMovie[] = JSON.parse(localStorage.getItem(name)!);
    if (!movies)
      return {
        items: [],
      };
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 24;
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;
    return {
      items: movies.slice(start, end),
      pagination: {
        currentPage: pageNum,
        totalItemsPerPage: limitNum,
        totalItems: movies.length,
        totalPages: Math.ceil(movies.length / limitNum),
      },
    };
  },
};
