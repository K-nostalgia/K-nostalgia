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

const EditProfilePage = () => {
  const { data: user, isLoading, error } = useUser();
  const [nickname, setNickname] = useState('');
  const [editImage, setEditImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
    }
  }, [user]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;

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
    setEditImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleEditClick = async () => {
    try {
      if (!user?.id) {
        throw new Error('사용자 ID가 없습니다.');
      }

      let imageUrl = user.avatar;

      if (editImage) {
        imageUrl = await api.auth.imageUpload(editImage);
      }

      if (!imageUrl) return;

      const updatedUser = await api.auth.updateUser(user.id, {
        nickname,
        avatar: imageUrl
      });

      setIsCompleted(true);

      // console.log('프로필 업데이트 성공', updatedUser);
      router.push('/my-page');
    } catch (error) {
      console.error('프로필 업데이트 실패', error);
    }
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
      onCompleteClick={handleEditClick} // 완료 버튼 클릭 핸들러
      headerTitle="프로필 수정"
    >
      <div className="p-6 rounded-lg flex flex-col items-center">
        <div className="relative w-[120px] h-[120px] rounded-full border border-primary-20 flex items-center justify-center">
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
        <div className="w-full relative mt-4">
          <label htmlFor="nickname" className="block text-label-normal">
            별명
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="사용할 별명을 입력해주세요"
            className="block w-full mt-2 p-3 px-3 border bg-normal border-primary-20 focus:outline-none focus:ring-primary-20 rounded-xl text-primary-20 pr-10"
            value={nickname}
            onChange={handleNicknameChange}
          />
          {nickname && !errorMessage ? (
            <BsCheck2 className="absolute right-3 top-[52%] text-[24px] text-[#755428]" />
          ) : (
            <CgClose
              className={`absolute right-3 ${
                errorMessage ? 'top-[42%]' : 'top-[52%]'
              } text-[24px] ${
                errorMessage ? 'text-red-500' : 'text-label-assistive'
              }`}
            />
          )}
          {errorMessage && (
            <span className=" text-red-500 text-sm ml-2">{errorMessage}</span>
          )}
        </div>
      </div>
    </DefaultAppLayout>
  );
};
export default EditProfilePage;
