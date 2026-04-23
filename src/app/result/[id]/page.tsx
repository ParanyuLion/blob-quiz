import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ResultPageClient from './ResultPageClient';
import { BLOB_RESULTS } from '../../../constants/blobResults';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = BLOB_RESULTS[params.id];
  if (!result) return { title: 'ไม่พบผลลัพธ์' };

  return {
    title: `${result.name} ${result.emoji} — คุณคือก้อน${result.rarity}!`,
    description: result.description,
    openGraph: {
      title: `${result.name} ${result.emoji}`,
      description: result.shareText,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(BLOB_RESULTS).map((id) => ({ id }));
}

export default function ResultPage({ params }: Props) {
  const result = BLOB_RESULTS[params.id];
  if (!result) notFound();
  return <ResultPageClient result={result} />;
}
