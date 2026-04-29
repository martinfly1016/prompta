// IndexNow key verification file
// Bing/Yandex fetch this to verify ownership
export async function GET() {
  return new Response('a7aeef04a83f93f3dadcc274274079db', {
    headers: { 'Content-Type': 'text/plain' },
  })
}
