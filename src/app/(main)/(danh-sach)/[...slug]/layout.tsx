import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Danh sách phim',
    description: 'Danh sách phim'
  };
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}