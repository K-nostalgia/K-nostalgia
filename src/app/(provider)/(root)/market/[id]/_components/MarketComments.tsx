'use client';

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';

interface MarketCommentsPropsType {
  userId?: string;
  marketId: number;
}

type userCommentType = {
  id: string;
  market_id: number;
  user_id: string;
  content: string;
  created_at: string;
  users: {
    avatar: string;
    nickname: string;
  };
};

const MarketComments = ({ userId, marketId }: MarketCommentsPropsType) => {
  const [comment, setComment] = useState('');
  const [updatedComment, setUpdatedComment] = useState('');
  const [editMode, setEditMode] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const newComment = {
    comment,
    userId
  };

  const createComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`/api/market/comment/${marketId}`, {
      method: 'POST',
      body: JSON.stringify(newComment)
    });
    console.log('디테일 response____', response);

    if (response.ok) {
      setComment('');
    } else {
      console.error('댓글 등록 실패용~');
    }
  };

  const { mutate: createCommentsMutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', marketId] });
    }
  });

  const getComments = async () => {
    const response = await fetch(`/api/market/comment/${marketId}`);
    const data = await response.json();
    console.log(data);
    return data;
  };

  const {
    data: comments,
    isError,
    isPending
  } = useQuery<userCommentType[]>({
    queryKey: ['comment', marketId],
    queryFn: getComments
  });

  const deleteComments = async (commentId: string) => {
    const response = await fetch(`/api/market/comment/${marketId}`, {
      method: 'DELETE',
      body: JSON.stringify(commentId)
    });
    if (!response.ok) {
      console.error('댓글 삭제 실패용~');
    }
  };

  const { mutate: deleteCommentsMutate } = useMutation({
    mutationFn: deleteComments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', marketId] });
    }
  });

  const updateComment = async (commentId: string) => {
    const response = await fetch(`/api/market/comment/${marketId}`, {
      method: 'PATCH',
      body: JSON.stringify({ comment: updatedComment, commentId })
    });

    if (response.ok) {
      setUpdatedComment('');
    } else {
      console.error('댓글 수정 실패용~');
    }
  };
  const { mutate: updateCommentsMutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment', marketId] });
    }
  });

  if (isPending) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="mt-6 mb-48">
      <p className="text-label-strong font-semibold text-base pl-1 ml-4 mb-2">
        댓글
      </p>
      <form
        className="bg-white w-[346px] h-12 mx-4 px-4 py-3 mb-1 border rounded-xl border-primary-20 flex items-center"
        onSubmit={createCommentsMutate}
      >
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          placeholder="댓글을 입력해 주세요"
          className="outline-none placeholder:text-[15px] placeholder:text-label-assistive text-[15px] font-normal text-label-strong flex-1 w-[283px] h-auto mr-1 "
        />
        <button className="flex w-6 h-6 p-[2px] items-center justify-center">
          <IoSend className="w-5 h-5 text-primary-20" />
        </button>
      </form>
      <div className="flex flex-col p-3 gap-3">
        {comments?.map((comment) => {
          return (
            <div key={comment.id} className="border-b-2 border-[#F2F2F2]">
              <div className="flex justify-between px-1">
                <div className="flex items-center gap-2 ">
                  <Image
                    src={comment.users.avatar}
                    alt="user프로필"
                    width={36}
                    height={36}
                    className="rounded-[18px]"
                  />
                  <p
                    className={
                      userId === comment.user_id
                        ? 'text-primary-10 text-base font-semibold'
                        : 'text-label-strong text-base font-semibold'
                    }
                  >
                    {comment.users.nickname}
                  </p>
                  <p className="text-sm font-normal text-label-assistive">
                    {comment.created_at.slice(0, 10).split('-').join('. ')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {userId === comment.user_id &&
                    (!editMode.includes(comment.id) ? (
                      <button
                        onClick={() => {
                          setEditMode((prev) => [...prev, comment.id]);
                          setUpdatedComment(comment.content);
                        }}
                        className="font-normal text-sm text-label-normal"
                      >
                        수정
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          updateCommentsMutate(comment.id);
                          setEditMode([]);
                        }}
                        className="font-normal text-sm text-label-normal"
                      >
                        확인
                      </button>
                    ))}
                  <div className="flex justify-center items-center w-[1px] h-3 bg-label-assistive" />
                  {userId === comment.user_id &&
                    (!editMode.includes(comment.id) ? (
                      <button
                        onClick={() => deleteCommentsMutate(comment.id)}
                        className="font-normal text-sm text-label-normal"
                      >
                        삭제
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditMode([])}
                        className="font-normal text-sm text-label-normal"
                      >
                        취소
                      </button>
                    ))}
                </div>
              </div>
              {editMode.includes(comment.id) ? (
                <div className="pl-[38px] pr-1 mb-3">
                  <input
                    type="text"
                    onChange={(e) => setUpdatedComment(e.target.value)}
                    value={updatedComment}
                    className="border rounded-[6px] border-[#959595] outline-none w-[309px] h-auto text-[15px] font-normal text-label-strong px-[10px] py-1 "
                  />
                </div>
              ) : (
                <div className="pl-12 pr-1 py-1 mb-3">
                  <p className="w-[299px] h-auto text-[15px] font-normal text-label-strong">
                    {comment.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketComments;
