import { NextResponse } from "next/server";

const allowedParams = [
    'keyword',
    'jobType',
    'education',
    'experience',
    'page',
    'salary',
    'location'
];

export async function middleware(req) {
    
    const url = req.nextUrl;
    let change = false

    url.searchParams.forEach((param, key) => {
        if (!allowedParams.includes(key)) {
            url.searchParams.delete(key);
            change = true;
        }
    })

    if (change) {
        return NextResponse.redirect(url)
    }
}
