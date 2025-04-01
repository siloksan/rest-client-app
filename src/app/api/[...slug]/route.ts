import { Methods } from "@/types";
import { base64ToBytes } from "@/utils/converterBase64";
import { NextResponse } from "next/server";

export async function GET(request: Request,
  { params }: { params: Promise<{ slug: string }> }) {
  const { slug: [method, urlBase64, body] } = await params;
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const url = new TextDecoder().decode(base64ToBytes(urlBase64))
  let response: Response;
  const headers = searchParams.entries().map(([key, value]) => [key, decodeURIComponent(value)])

  try {
    if(Methods.GET === method){
      response = await fetch(url, {
        headers: Object.fromEntries(headers)
      });
    } else if(Methods.DELETE === method) {
      response = await fetch(url, {
        headers: Object.fromEntries(headers)
      });
    } else {
      response = await fetch(url, {
        method: method,
        body: new TextDecoder().decode(base64ToBytes(body)),
        headers: Object.fromEntries(headers)
      });
    }
    const data = await response.json();
    return NextResponse.json({status: response.status, data: {...data}});
  } catch {
    return NextResponse.json({status: 'Error', data: {message: `Couldn't resolve the hostname to an IP address`}});
  }
}

