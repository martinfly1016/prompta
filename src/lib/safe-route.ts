// Safe route wrapper to handle build-time errors
export function safeRoute(handler: any) {
  return handler || (async () => new Response('Handler not available', { status: 503 }))
}
