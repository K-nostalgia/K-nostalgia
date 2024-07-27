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
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../common/Loading';
import supabase from '@/utils/supabase/client';
import { Tables } from '@/types/supabase';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import dayjs from 'dayjs';
import { StringToBoolean } from 'class-variance-authority/types';

// 채팅 아이디 가져와서 본인 아이디랑 같으면 오른쪽에 조건부 스타일링 + 다르면 왼족에 스타일링
// xs일 때 가정 sm:max-w-[425px]

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

  // chat 가져오기
  const fetchChatData = async () => {
    const response = await fetch(`/api/chat/chat-data`);
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
    const response = await fetch('/api/chat/chat-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

  // 유효성 검사 추가하기 비속어?
  const handleSendMessage = () => {
    //TODO mic 임시값 => 시간이 부족할 경우 룸 1개로 고정
    const room_id: string = 'K8uTq2XdYz5sPnL4rWj7B';

    if (!message || message.trim() === '') {
      // 토스트로 바꾸기
      alert('메세지 입력해라어흥');
      return;
    }

    const newMessage = {
      room_id,
      user_id: user?.id,
      content: message
    };

    sendMessageMutate.mutate(newMessage);
  };

  const handleKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const roomId: string = 'K8uTq2XdYz5sPnL4rWj7B';

    const channels = supabase
      .channel(`room_${roomId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat' },
        (payload) => {
          console.log('Change received!', payload);
          queryClient.invalidateQueries({ queryKey: ['chatData'] });
        }
      )
      .subscribe();
  }, [queryClient]);

  // TODO supabase DB 하루마다 삭제하는 로직? 이 있을지 찾아보기
  // TODO 가끔 2개씩 전송되는 거 있는데 좀 더 확인해보기!
  // TODO 로그인한 대상만 할 수 있게 처리_로그인 로직 끝나면 쿠키에서 가져오기 ? 로그인 안한 유저가 말하면 토스트 알림 보내기! ?

  // user 정보 가져오기 - 프로필 널일 때 처리
  // const featchUserData = async () => {
  //   const response = await fetch('/api/chat/chat-user');
  //   const { data: userData } = await response.json();
  //   return userData;
  // };

  // const { data: chatUserData } = useQuery<
  //   Tables<'users'>[],
  //   Error,
  //   Tables<'users'>[]
  // >({
  //   queryKey: ['chatUsers'],
  //   queryFn: () => featchUserData()
  // });

  // 날짜 포맷
  const formatDate = (date: string) => {
    return dayjs(date).locale('ko').format('YYYY.MM.DD HH:MM');
  };

  //TODO 스크롤 하단으로 유지
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [queryClient]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <ChatIcon />
        </Button>
      </DialogTrigger>
      {/*TODO 최소 크기일 때 max-w-[330px] 반응형일 때 조절하기  */}
      <DialogContent className="max-w-[330px] bg-normal rounded-xl">
        <div className="border-b-2 w-[calc(100%+33px)] -mx-4 shadow-[rgba(0,0,0,0.14)_0px_2px_4px_0px]">
          <DialogHeader>
            <DialogTitle className="mb-2 px-2 py-3">향그리움</DialogTitle>
            <DialogDescription>
              {/* TODO mic 채팅방 여러개면 여기다 할 수 있을 듯 */}
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="grid gap-4 py-4 h-[400px] xs:h-[400px] flex-1 overflow-y-auto scrollbar-hide">
          {data?.map((item) => {
            return item.user_id === user?.id ? (
              // 나일 경우
              <div key={item.id} className="flex flex-col gap-2">
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
                <div className="border border-primary-strong rounded-xl rounded-tr-none ml-auto text-white bg-primary-strong w-fit px-3 py-2">
                  {item.content}
                </div>
                <div className="text-xs text-label-assistive ml-auto">
                  {formatDate(item.created_at)}
                </div>
              </div>
            ) : (
              // 다른 사람일 경우
              <div key={item.id} className="flex flex-col gap-3 w-full">
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
                <div className="border border-primary-strong rounded-xl rounded-tl-none w-fit px-3 py-2">
                  {item.content}
                </div>
                <div className="text-xs text-label-assistive">
                  {formatDate(item.created_at)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t-2 w-[calc(100%+33px)] -mx-4 shadow-[rgba(31,30,30,0.08)_0px_-2px_8px_0px]">
          <DialogFooter className="xs:flex relative items-center">
            <div className="relative w-[87%] pt-4">
              <Input
                type="text"
                placeholder="메시지 보내기..."
                className="pr-12 rounded-xl border border-primary-strong placeholder:text-label-assistive"
                value={message}
                onChange={handleMessage}
                onKeyDown={handleKeyDownEnter}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-[64%] transform -translate-y-1/2"
                onClick={handleSendMessage}
              >
                <ChatSendIcon />
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
