import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      greeting: 'Hello',
    }),
  )
}

export const POST: APIRoute = ({ request }) => {
  return new Response(JSON.stringify({
      message: "This was a POST!"
    })
  )
}