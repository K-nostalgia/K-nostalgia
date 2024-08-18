'use client';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { PiArrowsLeftRight } from 'react-icons/pi';
import { BsCheck2 } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import api from '@/service/service';
import { useRouter } from 'next/navigation';
import Loading from '@/components/common/Loading';
import { validateNickName } from '@/utils/validate';
import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { BsChevronRight } from 'react-icons/bs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const EditProfilePage = () => {
  const { data: user, isLoading, error } = useUser();
  const [nickname, setNickname] = useState('');
  const [editImage, setEditImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateProfile = useMutation({
    mutationFn: async ({
      userId,
      nickname,
      avatar
    }: {
      userId: string;
      nickname: string;
      avatar: string;
    }) => {
      if (editImage) {
        avatar = await api.auth.imageUpload(editImage);
      }
      return api.auth.updateUser(userId, { nickname, avatar });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      Swal.fire({
        icon: 'success',
        title: '프로필 변경이 완료되었습니다.',
        html: `
          <div id="swal2-html-container" class="swal2-html-container" style=" padding:0 !important; margin:-1rem; font-size:16px;"> 내 프로필로 넘어갑니다. </div>
        `
      });
      router.push('/my-page');
    },
    onError: (error) => {
      console.error('프로필 업데이트 실패', error);
      alert('프로필 업데이트 실패');
    }
  });

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '닉네임을 입력해주세요');
      setPreviewImage(user.avatar || '/image/profile.png');
    }
  }, [user]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    if (newNickname === '') {
      setNickname('');
      setErrorMessage('');
      return;
    }

    if (validateNickName(newNickname)) {
      setNickname(newNickname);
      setErrorMessage('');
    } else {
      setErrorMessage('닉네임은 12자 이내로 입력해주세요.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    if (file) {
      setEditImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditClick = async () => {
    if (!user?.id) {
      alert('사용자 ID가 없습니다.');
      return;
    }

    updateProfile.mutate({
      userId: user.id,
      nickname,
      avatar: user.avatar || '/image/profile.png'
    });
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading user data</div>;

  return (
    <DefaultAppLayout
      showHeader={true}
      showNavigation={true}
      showSearch={false}
      showCart={false}
      showComplete={true}
      onCompleteClick={handleEditClick}
      headerTitle="프로필 수정"
    >
      <div className="p-6 rounded-lg flex flex-col items-center relative mt-20 md:mt-32">
        <div className="hidden md:flex md:items-center md:justify-center md:absolute md:w-[240px] md:h-[152px] md:-top-9 md:z-10 ">
          <Image
            src="/image/Profile_Adorn.png"
            alt="tiger overlay"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="relative w-[120px] md:w-[168px] md:h-[168px] h-[120px] rounded-full border border-primary-20 flex items-center justify-center">
          {user?.avatar ? (
            <Image
              src={previewImage ?? '/image/profile.png'}
              alt="profile"
              priority
              width={120}
              height={120}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <span>프로필 사진</span>
            </div>
          )}
          <label htmlFor="image-upload" className="cursor-pointer">
            <PiArrowsLeftRight className="absolute right-0 bottom-0 text-[36px] text-label-light rounded-full bg-primary-20" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className="w-full relative mt-4 md:py-3 md:px-4 md:flex md:flex-col md:gap-2 md: items-center md:justify-center">
          <label htmlFor="nickname" className="block text-label-normal">
            별명
          </label>
          <div className="md:relative">
            <input
              id="nickname"
              type="text"
              placeholder="사용할 별명을 입력해주세요"
              className="block w-full mt-2 p-3 px-3 border bg-white border-primary-20 focus:outline-none focus:ring-primary-20 rounded-xl text-primary-20 pr-10 md:w-[320px]"
              value={nickname}
              onChange={handleNicknameChange}
            />
            {nickname && !errorMessage ? (
              <BsCheck2 className="absolute right-3 top-[52%] md:top-[35%] text-[24px] text-[#755428]" />
            ) : (
              <CgClose
                className={`absolute right-3 ${
                  errorMessage
                    ? 'top-[42%] md:top-[25%]'
                    : 'top-[52%] md:top-[35%]'
                } text-[24px] ${
                  errorMessage ? 'text-red-500' : 'text-label-assistive'
                }`}
              />
            )}
            {errorMessage && (
              <span className=" text-red-500 text-sm ml-2">{errorMessage}</span>
            )}
          </div>

          <button
            className="hidden md:flex md:border md:border-[#C8C8C8] md:hover:bg-primary-strong md:hover:text-label-light md:px-4 md:py-2 md:rounded md:bg-[#F2F2F2] md:mt-10 md:text-[#AFACA7]"
            onClick={handleEditClick}
          >
            {' '}
            수정 완료{' '}
          </button>
        </div>
        {/* <div className="hidden md:flex md:flex-row md:items-center md:mt-[85px] ">
          <p className="md:text-label-alternative md:mr-1 "> 회원탈퇴 </p>
          <BsChevronRight className="md:text-[#838383] cursor-pointer md:w-4 md:h-4" />
        </div> */}
      </div>
    </DefaultAppLayout>
  );
};
export default EditProfilePage;
