import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const response = await fetch(`https://phimapi.com/phim/${params.slug}`);
  const data = await response.json();

  return {
    title: `Phim ${data.movie.name} ${data.movie.quality} ${data.movie.lang} - ${data.movie.origin_name} - CineChill`,
    description: data.movie.content
  };
}

export default function PhimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}