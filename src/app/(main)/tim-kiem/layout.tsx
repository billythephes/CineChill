import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Kết quả tìm kiếm phim',
    description: 'Kết quả tìm kiếm phim'
  };
}

export default function TimKiemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}