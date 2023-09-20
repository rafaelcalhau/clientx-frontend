import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTH_SESSION_NAME } from '@/modules/auth/auth.constants'
import { NextResponse } from 'next/server'
 
export async function GET(): Promise<NextResponse> {
  cookies().delete(AUTH_SESSION_NAME)
  return redirect('/signin')
}
