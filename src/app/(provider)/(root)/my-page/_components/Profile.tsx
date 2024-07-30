'use client';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Profile = () => {
  const { data: user, isLoading, error } = useUser();
  const router = useRouter();

  const handleEditMoveClick = () => {
    router.push('/profile-edit');
  };

  return (
    <div className="p-6 rounded-lg">
      <div className="flex flex-col items-center">
        <div className="w-[120px] h-[120px] rounded-full border border-primary-20">
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="profile"
              width={120}
              height={120}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <span> 프로필 사진 </span>
            </div>
          )}
        </div>
        <h2 className="text-xl text-label-strong font-semibold my-4">
          {user?.nickname ?? '설정된 닉네임이 없습니다.'}
        </h2>
        <button
          className="border text-[14px] border-primary-10 text-primary-20 px-4 py-[6px] rounded"
          onClick={handleEditMoveClick}
        >
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default Profile;
