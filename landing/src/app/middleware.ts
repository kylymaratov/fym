import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isMobileOrTablet = /iPhone|iPad|Android|Mobile|Tablet/i.test(userAgent);

  console.log(userAgent);
  if (isMobileOrTablet) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
