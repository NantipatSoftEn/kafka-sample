import type { APIRoute } from 'astro'
import { sendMessage } from '../../lib/kafka'

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      greeting: 'Hello',
    }),
  )
}

export const POST: APIRoute = ({ request }) => {
  sendMessage('Hello from Astro!')
  return new Response(JSON.stringify({
      message: "This was a POST!"
    })
  )
}