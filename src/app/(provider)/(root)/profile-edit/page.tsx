'use client';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { PiArrowsLeftRight } from 'react-icons/pi';
import { BsCheck2 } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import api from '@/service/service';

const EditProfilePage = () => {
  const { data: user, isLoading, error } = useUser();
  const [nickname, setNickname] = useState('');
  const [editimage, setEditImage] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
    }
  }, [user]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditImage(file);
  };

  const handleEditClick = async () => {
    try {
      if (!user?.id) {
        throw new Error('사용자 ID가 없습니다.');
      }

      const Updateduser = await api.auth.updateUser(user?.id, { nickname });
      console.log('닉네임 변경 성공', Updateduser);
    } catch (error) {
      console.error('업데이트 실패', error);
    }
  };

  return (
    <div className="p-6 rounded-lg flex flex-col items-center">
      <div className="relative w-[120px] h-[120px] rounded-full border border-primary-20 flex items-center justify-center">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="profile"
            priority
            width={120}
            height={120}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <span> 프로필 사진 </span>
          </div>
        )}
        <PiArrowsLeftRight className="absolute right-0 bottom-0 text-[36px] text-label-light rounded-full bg-primary-20" />
      </div>
      <div className="w-full relative">
        <label htmlFor="nickname" className="block text-label-normal">
          별명
        </label>
        <input
          id="nickname"
          type="text"
          placeholder="사용할 별명을 입력해주세요"
          className="block w-full mt-2 p-3 px-3 border bg-normal border-primary-20 focus:outline-none focus: ring-primary-20 rounded-xl text-primary-20 pr-10"
          defaultValue={user?.nickname || ''}
          onChange={handleNicknameChange}
        />
        {nickname ? (
          <BsCheck2
            className="absolute right-3 top-[55%] text-[24px] text-[#755428]"
            onClick={handleEditClick}
          />
        ) : (
          <CgClose className="absolute right-3 top-[55%] text-[24px] text-label-assistive" />
        )}
      </div>
    </div>
  );
};
export default EditProfilePage;
