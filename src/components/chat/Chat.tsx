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
// import { Label } from '@/components/ui/label';
import ChatIcon from '../icons/ChatIcon';
import ChatSendIcon from '../icons/ChatSendIcon';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../common/Loading';
import supabase from '@/utils/supabase/client';
import { Tables } from '@/types/supabase';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import dayjs from 'dayjs';
import { StringToBoolean } from 'class-variance-authority/types';

//
// xs일 때 가정 sm:max-w-[425px]
// TODO XSS 방지

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

export function Chat() {
  const [message, setMessage] = useState<string>('');
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const scrollDown = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // xss 공격 방지
  const encoded = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // chat 가져오기
  const fetchChatData = async () => {
    const response = await fetch(`/api/chat`);
    const { data } = await response.json();
    return data;
  };

  const { data, isPending, error } = useQuery<
    chatMessageType[],
    Error,
    chatMessageType[]
  >({
    queryKey: ['chatData'],
    queryFn: fetchChatData
  });

  // chat 입력
  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  //chat 전송
  const sendMessage = async (newMessage: {
    room_id: string;
    user_id: string | undefined;
    content: string | null;
  }) => {
    const response = await fetch('/api/chat', {
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
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['chatData'] });
    }
  });

  // 유효성 검사 추가하기
  const handleSendMessage = () => {
    const room_id: string = 'K8uTq2XdYz5sPnL4rWj7B';

    const newMessage = {
      room_id,
      user_id: user?.id,
      content: message
    };

    sendMessageMutate.mutate(newMessage);
  };

  const handleSubmitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSendMessage();
  };

  useEffect(() => {
    const roomId: string = 'K8uTq2XdYz5sPnL4rWj7B';

    const channels = supabase
      .channel(`room_${roomId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat' },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ['chatData'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channels);
    };
  }, [queryClient]);

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

  const handleDialogStateChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogStateChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          onClick={() => setIsOpen(true)}
          className="flex justify-center items-center"
        >
          <ChatIcon />
        </Button>
      </DialogTrigger>
      {/*TODO 현재 w-[330px] 반응형일 때 조절하기 */}
      <DialogContent
        className="bg-normal w-[330px]"
        style={{ borderRadius: '16px' }}
      >
        <div className="border-b-2 w-[calc(100%+33px)] -mx-4">
          <DialogHeader>
            <DialogTitle className="flex pt-3 px-3 pb-2 font-semibold text-lg leading=[28.8px] items-center justify-center">
              향그리움
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </div>
        <div
          className="grid py-4 h-[400px] flex-1 overflow-y-auto scrollbar-hide"
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
                <div className="border border-primary-strong rounded-xl rounded-tl-none w-fit px-3 py-2 mt-[10px]">
                  {encoded(item.content)}
                </div>
                <div className="text-xs text-label-assistive mt-1">
                  {formatDate(item.created_at)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t-2 w-[calc(100%+33px)] -mx-4">
          <DialogFooter className="flex relative items-center">
            <form
              className="relative w-[90%] mx-auto items-center"
              onSubmit={handleSubmitMessage}
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder={
                    user
                      ? '메시지 보내기...'
                      : '향그리움의 가족만 이용할 수 있어요'
                  }
                  className="pr-12 rounded-xl border border-primary-strong placeholder:text-label-assistive mt-4 mb-1"
                  value={message}
                  onChange={handleMessage}
                  disabled={!user}
                  aria-label="메시지 입력"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  disabled={!user || message.trim() === ''}
                  aria-label="메시지 전송"
                >
                  <ChatSendIcon />
                </Button>
              </div>
            </form>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
