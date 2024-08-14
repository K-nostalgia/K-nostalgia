'use client';

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
import { Input } from '@/components/ui/input';
import ChatSendIcon from '../../icons/ChatSendIcon';
import { useEffect, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '@/utils/supabase/client';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import dayjs from 'dayjs';
import { Tables } from '@/types/supabase';
import { GoArrowLeft } from 'react-icons/go';

interface chatUserType {
  avatar: string;
  nickname: string;
}

interface chatMessageType {
  id: number;
  created_at: string;
  room_id: string;
  user_id: string;
  content: string;
  users: chatUserType;
}

interface SendChatProps {
  selectedChatRoom: Tables<'rooms'> | null;
  setSelectedChatRoom: React.Dispatch<
    React.SetStateAction<Tables<'rooms'> | null>
  >;
  isOpen: boolean;
}

export function SendChat({
  selectedChatRoom,
  setSelectedChatRoom,
  isOpen
}: SendChatProps) {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const messageRef = useRef<HTMLInputElement>(null);
  const scrollDown = useRef<HTMLDivElement | null>(null);

  // xss 공격 방지
  const encoded = (str: string) => {
    if (str === null) {
      return;
    }
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // chat 가져오기
  const fetchChatData = async () => {
    const response = await fetch(`/api/chat/chat-read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ room_id: selectedChatRoom?.room_id })
    });
    const { data } = await response.json();
    return data;
  };

  const { data } = useQuery<chatMessageType[], Error, chatMessageType[]>({
    queryKey: ['chatData', selectedChatRoom?.room_id],
    queryFn: fetchChatData,
    enabled: !!selectedChatRoom?.room_id
  });

  //chat 전송
  const sendMessage = async (newMessage: {
    room_id: string;
    user_id: string;
    content: string;
  }) => {
    const response = await fetch('/api/chat/chat-send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(newMessage)
    });

    return response.json();
  };

  const sendMessageMutate = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatData', selectedChatRoom?.room_id]
      });
      if (messageRef.current) {
        messageRef.current.value = '';
      }
    }
  });

  // 유효성 검사 추가하기
  const handleSendMessage = () => {
    if (!user || !selectedChatRoom) {
      return;
    }

    if (!messageRef.current?.value.trim()) {
      console.log('메시지가 비어잇어흥.');
      return;
    }

    const newMessage = {
      room_id: selectedChatRoom.room_id,
      user_id: user.id,
      content: messageRef.current.value
    };

    sendMessageMutate.mutate(newMessage);
  };

  const handleSubmitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSendMessage();
  };

  useEffect(() => {
    if (!selectedChatRoom?.room_id) {
      return;
    }

    const channels = supabase
      .channel(`room_${selectedChatRoom?.room_id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat' },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ['chatData', selectedChatRoom?.room_id]
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [queryClient, selectedChatRoom?.room_id]);

  // 날짜 포맷
  const formatDate = (date: string) => {
    return dayjs(date).locale('ko').format('YYYY.MM.DD HH:mm');
  };

  // 1) 모달 켰을 때, 2) 채팅 메세지 쓸 때 스크롤 하단 유지
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        if (scrollDown.current) {
          scrollDown.current.scrollTo({
            top: scrollDown.current.scrollHeight
            // behavior: 'smooth'
          });
        }
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, data]);

  const handleBackChatRoom = () => {
    setSelectedChatRoom(null);
  };

  return (
    <DialogContent className="bg-normal w-[330px] rounded-[16px] md:w-[608px]">
      <div className="border-b-2 w-[calc(100%+32px)] -mx-4">
        <DialogHeader>
          <DialogTitle className="flex pt-3 px-3 pb-2 font-semibold text-lg leading-[28.8px] justify-between">
            <button onClick={handleBackChatRoom}>
              <GoArrowLeft className="w-7 h-7" />
            </button>
            <div>{selectedChatRoom?.chat_name}</div>
            <div className="invisible w-7" />
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </div>

      <div
        className="py-4 h-[400px] flex-1 overflow-y-auto scrollbar-hide"
        ref={scrollDown}
      >
        {data?.map((item) => {
          return item.user_id === user?.id ? (
            // 나일 경우
            <div key={item.id} className="flex flex-col mb-3 w-full">
              {item.users?.avatar ? (
                <Image
                  src={item.users?.avatar}
                  alt={`${item.users?.nickname}의 프로필`}
                  height={36}
                  width={36}
                  className="rounded-full ml-auto w-9 h-9"
                />
              ) : (
                <div className="w-9 h-9 border-2 rounded-full flex items-center justify-center">
                  X
                </div>
              )}
              <div className="border border-primary-strong rounded-xl rounded-tr-none ml-auto mt-[10px] text-white bg-primary-strong w-fit px-3 py-2">
                {encoded(item.content)}
              </div>
              <div className="text-xs text-label-assistive ml-auto mt-1">
                {formatDate(item.created_at)}
              </div>
            </div>
          ) : (
            // 다른 사람일 경우
            <div key={item.id} className="flex flex-col mb-3 w-full">
              <div className="flex gap-2">
                {/* TODO null 일 경우 기본 이미지 태그로 바꾸기 */}
                {item.users?.avatar ? (
                  <Image
                    src={item.users.avatar}
                    alt={`${item.users.nickname}의 프로필`}
                    height={36}
                    width={36}
                    className="rounded-full w-9 h-9"
                  />
                ) : (
                  <div className="w-9 h-9 border-2 rounded-full flex items-center justify-center">
                    X
                  </div>
                )}
                <div className="flex items-center font-semibold mr-auto">
                  {item.users?.nickname}
                </div>
              </div>
              <div className="border border-primary-strong rounded-xl rounded-tl-none w-fit px-3 py-2 mt-[10px] bg-white">
                {encoded(item.content)}
              </div>
              <div className="text-xs text-label-assistive mt-1">
                {formatDate(item.created_at)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t-2 w-[calc(100%+32px)] -mx-4">
        <DialogFooter className="flex relative items-center">
          <form
            className="relative w-[90%] mx-auto items-center"
            onSubmit={handleSubmitMessage}
          >
            <div className="relative">
              <Input
                ref={messageRef}
                type="text"
                placeholder={
                  user
                    ? '메시지 보내기...'
                    : '향그리움의 가족만 이용할 수 있어요'
                }
                className="pr-12 rounded-xl border border-primary-strong placeholder:text-label-assistive mt-4 mb-1 text-base bg-white"
                disabled={!user}
                aria-label="메시지 입력"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                disabled={!user}
                aria-label="메시지 전송"
              >
                <ChatSendIcon />
              </Button>
            </div>
          </form>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}

export default SendChat;
