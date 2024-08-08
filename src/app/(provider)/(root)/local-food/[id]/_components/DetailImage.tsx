import Image from 'next/image';

interface ImageProps {
  food: string | null;
}

export const DetailImage = ({ food }: ImageProps) => {
  return (
    <>
      {food && (
        <Image
          src={food}
          width={375}
          height={2451}
          priority
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt="상세페이지"
        />
      )}
    </>
  );
};
