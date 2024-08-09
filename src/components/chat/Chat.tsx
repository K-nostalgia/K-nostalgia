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
import { useEffect, useRef, useState } from 'react';
import ChatIcon from '../icons/ChatIcon';
import ChatList from './_component/ChatList';
import { Tables } from '@/types/supabase';
import SendChat from './_component/SendChat';

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatRoom, setSelectedChatRoom] =
    useState<Tables<'rooms'> | null>(null);

  const handleDialogStateChange = (open: boolean) => {
    setIsOpen(open);
    console.log(isOpen);
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
      {!selectedChatRoom ? (
        <ChatList setSelectedChatRoom={setSelectedChatRoom} />
      ) : (
        <SendChat
          selectedChatRoom={selectedChatRoom}
          setSelectedChatRoom={setSelectedChatRoom}
          isOpen={isOpen}
        />
      )}
    </Dialog>
  );
}
