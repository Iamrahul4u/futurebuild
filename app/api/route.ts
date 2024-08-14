import Ably from "ably";
import { NextApiRequest } from "next";
export const revalidate = 0;
import dynamic from "next/dynamic";
export async function GET(request: NextApiRequest) {
  // @ts-ignore
  const client = new Ably.Rest(process.env.ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "ably-nextjs-chat",
  });
  return Response.json(tokenRequestData);
}
