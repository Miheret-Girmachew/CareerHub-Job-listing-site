import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('currentUser');
    console.log("this" , currentUser)
    if (!currentUser && request.nextUrl.pathname.startsWith('/jobs')) {
       console.log("not  access now")
        return NextResponse.redirect(new URL('/l', request.url));
    }
    if (!currentUser && request.nextUrl.pathname.startsWith('/listing')) {
       console.log("not  acsess now")
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    if (!currentUser && request.nextUrl.pathname.startsWith('/verify')) {
        console.log("not  acsess now")
         return NextResponse.redirect(new URL('/', request.url));
     }

    return NextResponse.next();
}