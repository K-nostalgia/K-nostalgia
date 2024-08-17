import Image from 'next/image';

interface ImageProps {
  food: string | null;
}

export const DetailImage = ({ food }: ImageProps) => {
  return (
    <section>
      {food && (
        <Image
          src={food}
          width={375}
          height={2451}
          priority
          style={{ objectFit: 'cover' }}
          alt="상세페이지"
          className="lg:w-[860px] mx-auto w-[100%]"
        />
      )}
    </section>
  );
};
