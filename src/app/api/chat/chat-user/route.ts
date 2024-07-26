import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

  export const GET = async (request:NextRequest) => {
    try{
        const {data:chatUsers, error:chatUsersError} = await supabase.from('users').select('*')

        if (chatUsersError) {
            return NextResponse.json({error:chatUsersError.message}, {status: 400});
        }
        
    return NextResponse.json({data: chatUsers});
    } catch(error){
    return NextResponse.json({error: "Server error"}, {status: 500});
    }
}