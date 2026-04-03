// import { createServerClient } from "@supabase/ssr";
// import { NextResponse, type NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//     let response = NextResponse.next({
//         request: { headers: request.headers },
//     });

//     const supabase = createServerClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL!,
//         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//         {
//             cookies: {
//                 getAll() { return request.cookies.getAll(); },
//                 setAll(cookiesToSet) {
//                     cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
//                     response = NextResponse.next({ request });
//                     cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
//                 },
//             },
//         }
//     );

//     await supabase.auth.getUser();

//     return response;
// }

// export const config = {
//     matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
// };
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: { headers: request.headers },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value);
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    // This is the critical part to refresh the session
    const { data: { user } } = await supabase.auth.getUser();

    // Protection: If trying to access admin and not logged in
    if (request.nextUrl.pathname.startsWith('/admin') && !user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};