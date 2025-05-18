import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Phim cực hay - Chill cực đã - CineChill',
    description: 'Phim cực hay - Chill cực đã - CineChill'
  };
}

export default function PhimLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}