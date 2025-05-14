import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const response = await fetch(`https://phimapi.com/v1/api/${params.slug[0]}/${params.slug[1]}`);
  const data = await response.json();
  
  return {
    title: data.data.seoOnPage.titleHead,
    description: data.data.seoOnPage.descriptionHead
  };
}

export default function DanhSachLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}