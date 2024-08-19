'use client';
import { toast } from '@/components/ui/use-toast';
import api from '@/service/service';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsTrash3 } from 'react-icons/bs';
import Swal from 'sweetalert2';

const CancelUser = () => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    try {
      Swal.fire({
        title: '정말 향그리움을 나가시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f2f2f2',
        cancelButtonColor: '#9C6D2E',
        cancelButtonText: '취소하기',
        confirmButtonText: '탈퇴하기'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await api.auth.deleteUser();
            toast({
              variant: 'destructive',
              description: '탈퇴되었습니다. 다음에 다시 이용해주세요. '
            });
            router.push('/log-in');
          } catch (error) {
            console.error('탈퇴 에러');
            toast({
              variant: 'destructive',
              description: '탈퇴가 불가능합니다. '
            });
          }
        }
      });
    } catch (error) {
      console.error('탈퇴 과정에서 에러가 발생했습니다.');
    }
  };
  return (
    <div className="p-4">
      <div className="flex items-center py-[3px]">
        <BsTrash3 className="mr-[8px] text-label-normal text-[20px]" />
        <div onClick={handleDeleteUser} className="cursor-pointer">
          {' '}
          회원탈퇴{' '}
        </div>
      </div>
    </div>
  );
};

export default CancelUser;
