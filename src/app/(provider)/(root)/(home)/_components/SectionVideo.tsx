import Image from 'next/image';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';

export const SectionVideo = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center my-8">
        <div>
          <h1 className="text-lg text-label-strong font-semibold">
            안 가면 후회하는 K-관광마켓 4선
          </h1>
          <p className="text-sm font-medium text-label-assistive mt-1">
            한국에서만 만나볼 수 있는 특별한 관광, 전통시장 <br />그 중에서도
            제일 인기있는 4개의 시장을 소개합니다!
          </p>
        </div>
        <Link href={'https://www.youtube.com/watch?v=ym2iQ9HCydM'}>
          <Image
            src={
              'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/youtube.png'
            }
            width={260}
            height={180}
            priority
            alt="시장 유튜브 이미지"
            style={{ width: 260, height: 180, objectFit: 'cover' }}
            className="my-4"
          />
        </Link>
        <Link
          href={'https://www.youtube.com/watch?v=ym2iQ9HCydM'}
          className="flex items-center gap-1"
        >
          <p className="underline text-label-normal text-sm font-medium">
            영상보러 가기
          </p>
          <BsChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
};
