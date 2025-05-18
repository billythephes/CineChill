import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Xem phim tại nhà - CineChill',
    description: 'Xem phim tại nhà - CineChill'
  };
}

export default function XemPhimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}