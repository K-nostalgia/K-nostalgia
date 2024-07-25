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
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../common/Loading';
import supabase from '@/utils/supabase/client';
import { Tables } from '@/types/supabase';

// 채팅 아이디 가져와서 본인 아이디랑 같으면 오른쪽에 조건부 스타일링 + 다르면 왼족에 스타일링
// xs일 때 가정 sm:max-w-[425px]

export function Chat() {
  const [message, setMessage] = useState<string>('');
  const queryClient = useQueryClient();

  // chat 가져오기
  const fetchChatData = async () => {
    const response = await fetch(`/api/chat`);
    const { data } = await response.json();
    return data;
  };

  const { data, isPending, error } = useQuery<
    Tables<'chat'>[],
    Error,
    Tables<'chat'>[]
  >({
    queryKey: ['chatData'],
    queryFn: fetchChatData
  });

  // chat 입력
  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setMessage(event.target.value);
  };

  //chat 전송
  const sendMessage = async (newMessage: {
    room_id: string;
    user_id: string;
    content: string | null;
  }) => {
    const response = await fetch('/api/chat', {
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

  // 유효성 검사
  const handleSendMessage = () => {
    //TODO mic 임시값
    const room_id: string = 'K8uTq2XdYz5sPnL4rWj7B';
    const user_id: string = '27fbff7c-a3c3-4ec5-a55d-4f95fc7c8b34';

    if (!message || message.trim() === '') {
      // 토스트로 바꾸기
      alert('메세지 입력해라어흥');
      return;
    }

    const newMessage = {
      room_id,
      user_id,
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

  // console.log(data);

  // const roomId: string = 'K8uTq2XdYz5sPnL4rWj7B';
  // const channel = supabase.channel('room1');
  // channel
  //   .on('broadcast', { event: 'input-event' }, (payload) => {
  //     console.log('input-event received!', payload);
  //   })
  //   .subscribe((status) => {
  //     if (status === 'SUBSCRIBED') {
  //       channel.send({
  //         type: 'broadcast',
  //         event: 'input-event',
  //         payload: { roomId, message }
  //       });
  //     }
  //   });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <ChatIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="xs:max-w-[330px] bg-normal rounded-xl">
        <div className="border-b-2 w-[calc(100%+48px)] -mx-6 shadow-[rgba(0,0,0,0.14)_0px_2px_4px_0px]">
          <DialogHeader>
            <DialogTitle className="mb-2 px-2 py-3">향그리움</DialogTitle>
            {/* TODO mic 채팅방 여러개면 여기다 할 수 있을 듯 */}
            <DialogDescription>
              {/* Make changes to your profile here. Click save when youre done. */}
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="grid gap-4 py-4 h-[400px] xs:h-[400px] scrollbar-hide">
          {/* TODO UI 목업 */}
          {data?.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="border-2 rounded-full p-2 w-fit">플필</div>
                <div className="flex items-center">닉네임</div>
              </div>
              {/* TODO userid === 세션 id랑 같을 때 우측 아니면 좌측 */}
              <div className="border-2">{item.content}</div>
            </div>
          ))}
          {/* 다른 사람 */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-2">
              <div className="border-2 rounded-full p-2 w-fit">플필</div>
              <div className="flex items-center font-semibold">닉네임</div>
            </div>
            {/* TODO userid === 세션 id랑 같을 때 우측 아니면 좌측 */}
            <div className="border-2 border-primary-strong rounded-xl rounded-tl-none w-fit px-3 py-2">
              조금말하기
            </div>
            <div className="text-xs text-label-assistive">2024.11.12 19:11</div>
          </div>

          {/* 나일 떄 디자인 */}
          <div className="flex flex-col gap-2">
            <div className="flex ml-auto border-2 rounded-full p-2 w-fit">
              플필
            </div>
            <div className="border-2 border-primary-strong rounded-xl rounded-tr-none ml-auto text-white bg-primary-strong w-fit px-3 py-2">
              조금 말하려다 많이 말하기~~~~~~~
            </div>
            <div className="text-xs text-label-assistive ml-auto">
              2024.11.12 19:11
            </div>
          </div>

          {/* 절취선,,,,  */}
        </div>
        <div className="border-t-2 w-[calc(100%+48px)] -mx-6 shadow-[rgba(31,30,30,0.08)_0px_-2px_8px_0px]">
          <DialogFooter className="xs:flex relative items-center">
            <div className="relative w-[87%] pt-4">
              <Input
                type="text"
                placeholder="메시지 보내기..."
                className="pr-12 rounded-xl border-2 border-primary-strong placeholder:text-label-assistive"
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
