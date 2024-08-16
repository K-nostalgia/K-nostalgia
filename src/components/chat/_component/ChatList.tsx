'use client';

import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Image from 'next/image';
import { BsChevronRight } from 'react-icons/bs';

const ChatList = ({
  setSelectedChatRoom
}: {
  setSelectedChatRoom: React.Dispatch<
    React.SetStateAction<Tables<'rooms'> | null>
  >;
}) => {
  const fetchChatListData = async () => {
    const response = await fetch(`/api/chat/chat-list`);
    const { data } = await response.json();
    return data;
  };

  const { data, isPending, error } = useQuery<Tables<'rooms'>[]>({
    queryKey: ['chatList'],
    queryFn: fetchChatListData
  });

  const handleRoom = (item: Tables<'rooms'> | null): void => {
    setSelectedChatRoom(item);
  };

  return (
    <DialogContent className="bg-normal rounded-2xl w-[330px]">
      <div className="border-b-2 w-[calc(100%+33px)] -mx-4">
        <DialogHeader>
          <DialogTitle className="flex pt-3 px-3 pb-2 font-semibold text-lg leading-[28.8px] items-center justify-center">
            실시간 채팅
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </div>

      <div className="flex flex-col py-4 h-[472px] flex-1 gap-3">
        {data?.map((item) => (
          <div
            key={item.room_id}
            className="flex border py-4 pl-4 pr-3 rounded-xl gap-1 cursor-pointer shadow-chatCustom justify-between"
            onClick={() => handleRoom(item)}
          >
            <Image
              src={item.room_img}
              width={48}
              height={48}
              alt={item.chat_name}
              className="w-12 h-12"
            />
            <div className="ml-2 flex flex-col justify-center">
              <div className="font-medium text-base leading-[22.4px]">
                {item.chat_name}
              </div>
              <div className="font-normal text-sm leading-[19.6px] text-label-alternative overflow-ellipsis">
                {item.chat_description}
              </div>
            </div>
            <div className="flex justify-center p-3">
              <BsChevronRight className="w-[22px] h-[22px]" />
            </div>
          </div>
        ))}
      </div>
      <div className="border border-b">채팅방 이용시 주의사항</div>
    </DialogContent>
  );
};

export default ChatList;
