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

// 채팅 아이디 가져와서 본인 아이디랑 같으면 오른쪽에 조건부 스타일링 + 다르면 왼족에 스타일링
// xs일 때 가정 sm:max-w-[425px]

export function Chat() {
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
        <div className="grid gap-4 py-4 h-[400px] xs:h-[400px] w-[87%]">
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div> */}
          {/* TODO UI 목업 */}
          <div className="flex flex-col gap-2">
            <div className="flex">
              <div className="border-2 rounded-full p-2 w-fit">플필</div>
              <div>닉네임</div>
            </div>
            <div className="border-2">말풍선 ㅎㅇ</div>
          </div>
        </div>
        <div className="border-t-2 w-[calc(100%+48px)] -mx-6 shadow-[rgba(31,30,30,0.08)_0px_-2px_8px_0px]">
          <DialogFooter className="xs:flex relative items-center">
            <div className="relative w-[87%] pt-4">
              <Input
                type="text"
                id="message"
                placeholder="메시지 보내기..."
                className="pr-12 rounded-xl border-primary-strong placeholder:text-label-assistive"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-[64%] transform -translate-y-1/2"
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
