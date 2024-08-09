'use client';

import { DELETE } from '@/app/api/market/comment/[marketId]/route';
import { Tables } from '@/types/supabase';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';

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
      body: JSON.stringify({ comment, commentId })
    });

    if (response.ok) {
      setComment('');
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
    <div className="mx-4 my-6">
      <form onSubmit={createCommentsMutate}>
        <p className="text-label-strong font-semibold text-base">댓글</p>
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          className="border-4"
        />
        <button>등록</button>
      </form>
      <div>
        {comments?.map((comment) => {
          return (
            <div key={comment.id}>
              <Image
                src={comment.users.avatar}
                alt="user프로필"
                width={100}
                height={100}
              />
              {userId === comment.user_id && (
                <button onClick={() => updateCommentsMutate(comment.id)}>
                  수정
                </button>
              )}
              {userId === comment.user_id && (
                <button onClick={() => deleteCommentsMutate(comment.id)}>
                  삭제
                </button>
              )}
              <p>{comment.users.nickname}</p>
              <p>{comment.created_at.slice(0, 10).split('-').join('. ')}</p>
              <p>{comment.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketComments;
