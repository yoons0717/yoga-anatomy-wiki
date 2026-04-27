import SequenceProvider from '@/components/sequence/SequenceProvider';
import SequencePageClient from '@/components/sequence/SequencePageClient';

export const metadata = {
  title: 'Sequence Builder | Anatomy Archive',
  description: '아사나를 드래그&드롭으로 조합해 나만의 수련 시퀀스를 설계하세요.',
};

export default function SequencePage() {
  return (
    <SequenceProvider>
      <SequencePageClient />
    </SequenceProvider>
  );
}
