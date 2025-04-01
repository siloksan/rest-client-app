import { Methods } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request,
  { params }: { params: Promise<{ slug: string }> }) {
  const { slug: [method, url, body] } = await params;
  const searchParams = new URLSearchParams(new URL(request.url).search);
  let response: Response;

  if(Methods.GET === method){
    response = await fetch(atob(url));
  } else {
    response = await fetch(atob(url), {
      method: method,
      body: JSON.parse(atob(body)),
      headers: Object.fromEntries(searchParams.entries())
    });
  }

  const data = await response.json();
  return NextResponse.json({status: response.status, data: {...data}});
}

