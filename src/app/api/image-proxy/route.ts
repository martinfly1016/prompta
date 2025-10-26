import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    console.log('=== IMAGE PROXY REQUEST ===')
    console.log('URL:', url)

    if (!url) {
      console.log('ERROR: No URL provided')
      return new NextResponse(
        JSON.stringify({ error: 'URL parameter is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Verify it's a valid blob URL
    if (!url.includes('public.blob.vercel-storage.com')) {
      console.log('ERROR: Invalid URL domain')
      return new NextResponse(
        JSON.stringify({ error: 'Invalid image URL' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Fetch the image from Vercel Blob
    console.log('Fetching from:', url)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    })

    console.log('Response status:', response.status)
    console.log('Response content-type:', response.headers.get('content-type'))

    if (!response.ok) {
      console.log('ERROR: Fetch failed with status', response.status)
      return new NextResponse(
        JSON.stringify({ error: 'Failed to fetch image' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const buffer = await response.arrayBuffer()
    console.log('Buffer size:', buffer.byteLength)
    const contentType = response.headers.get('content-type') || 'image/png'

    console.log('Returning image with size:', buffer.byteLength)

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Image proxy error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Failed to proxy image', details: String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
