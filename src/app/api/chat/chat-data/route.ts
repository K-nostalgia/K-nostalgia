import { Tables } from "@/types/supabase";
import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest) => {
    try{
        const {data:chatData, error:chatError} = await supabase.from('chat').select('*');

        if (chatError) {
            return NextResponse.json({error:chatError.message}, {status: 400});
        }
        
    return NextResponse.json({data: chatData});
    } catch(error){
    return NextResponse.json({error: "Server error"}, {status: 500});
    }
}

export const POST = async (request:NextRequest) => {
    //바다에서 값 받기...
    const {room_id, user_id, content}: Tables<'chat'> = await request.json();

    const {data:chatData, error:chatError} = await supabase.from('chat').insert([{
room_id, user_id, content
        }])
        .select()

    if (chatError) {
        return NextResponse.json({error:chatError.message}, {status:400});
    }
    return NextResponse.json({data:chatData});

   
}
