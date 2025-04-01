import { Methods } from "@/types";
import { base64ToBytes } from "@/utils/converterBase64";
import { NextResponse } from "next/server";

export async function GET(request: Request,
  { params }: { params: Promise<{ slug: string }> }) {
  const { slug: [method, url, body] } = await params;
  const searchParams = new URLSearchParams(new URL(request.url).search);
  let response: Response;

  try {
    if(Methods.GET === method){
      response = await fetch(new TextDecoder().decode(base64ToBytes(url)), {
        headers: Object.fromEntries(searchParams.entries())
      });
    } else {
      response = await fetch(new TextDecoder().decode(base64ToBytes(url)), {
        method: method,
        body: JSON.parse(new TextDecoder().decode(base64ToBytes(body))),
        headers: Object.fromEntries(searchParams.entries())
      });
    }
    const data = await response.json();
    return NextResponse.json({status: response.status, data: {...data}});
  } catch {
    return NextResponse.json({status: 'Error', data: {message: `Couldn't resolve the hostname to an IP address`}});
  }
}

