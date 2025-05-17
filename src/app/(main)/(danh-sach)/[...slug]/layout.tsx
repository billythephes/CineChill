import { Metadata } from 'next';

type Props = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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