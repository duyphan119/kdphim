import Breadcrumb from '@/components/breadcrumb'

type Props = {
  movie: T_Movie;
  hasChildren: boolean; currentBreadcrumb?: string;
}

export default function MovieBreadcrumb({ movie, hasChildren, currentBreadcrumb }: Props) {
  const movieTypeSlug = movie.type === "series" ? "phim-bo" : "phim-le";
  const movieTypeName = movie.type === "series" ? "Phim bộ" : "Phim lẻ";
  const movieSlug = movie.slug;
  return (
    <Breadcrumb
      items={[
        {
          slug: `/danh-sach/${movieTypeSlug}`,
          isCurrent: false,
          name: movieTypeName,
          position: 1,
        },
        {
          slug: `/nam/${movieTypeSlug}?year=${movie.year}`,
          isCurrent: false,
          name: movie.year + "",
          position: 2,
        },
        {
          slug: `/nam/${movieTypeSlug}?year=${movie.year}&country=${movie.country[0].slug}`,
          isCurrent: false,
          name: movie.country[0].name,
          position: 3,
        },
        {
          slug: `/nam/${movieTypeSlug}?year=${movie.year}&country=${movie.country[0].slug}&category=${movie.category[0].slug}`,
          isCurrent: false,
          name: movie.category[0].name,
          position: 4,
        },
        {
          isCurrent: hasChildren ? false : true,
          name: movie.name,
          position: 5,
          slug: hasChildren ? `/phim/${movie.slug}` : undefined,
        },
        ...(hasChildren && currentBreadcrumb
          ? [
            {
              isCurrent: true,
              name: currentBreadcrumb,
              position: 6,
            },
          ]
          : []),
      ]}
    />
  )
}