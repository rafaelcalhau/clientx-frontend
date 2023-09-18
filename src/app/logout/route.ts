import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTH_SESSION_NAME } from '@/modules/auth/auth.constants'
 
export async function GET() {
  cookies().delete(AUTH_SESSION_NAME)
  redirect('/signin')
}
