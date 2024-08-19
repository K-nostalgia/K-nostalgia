import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest) => {

    try{
        const {data:reportedChatData, error:reportedChatError} = await supabase
        .from('chat')
        .select('*')
        .eq('isReported', true)

        if (reportedChatError) {
            return NextResponse.json({error:reportedChatError.message}, {status: 400});
        }
    return NextResponse.json({data: reportedChatData}, {status: 200});
    } catch(error){
    return NextResponse.json({error: "Server error"}, {status: 500});
    }
}