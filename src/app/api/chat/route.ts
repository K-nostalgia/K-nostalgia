import { Tables } from "@/types/supabase";
import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest) => {
    try{
        const {data:chatData, error:chatError} = await supabase
        .from('chat')
        .select(`*, users(nickname, avatar)`)
        // 오늘만 가져오는 로직
        .gte('created_at', new Date().toISOString().split('T')[0])
        .lt('created_at', new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0])
        .order('created_at', { ascending: true })

        if (chatError) {
            return NextResponse.json({error:chatError.message}, {status: 400});
        }
    return NextResponse.json({data: chatData});
    } catch(error){
    return NextResponse.json({error: "Server error"}, {status: 500});
    }
}

export const POST = async (request:NextRequest) => {
    const {room_id, user_id, content}: Tables<'chat'> = await request.json();

    const {data:chatData, error:chatError} = await supabase
    .from('chat')
    .insert([{room_id, user_id, content}])
    .select();

    if (chatError) {
        return NextResponse.json({error:chatError.message}, {status:400});
    }
    return NextResponse.json({data:chatData});
}
