
'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export const getCookieServerSide = async (name: string): Promise<string | null> => {
  try {
    const cookieStore = await cookies()
    return cookieStore?.get(name)?.value ?? null
  } catch (error) {
    console.error('getCookieValue error--->', error)
    return null
  }
}

export const deleteCookieServerSide = async (name: string): Promise<boolean> => {
  try {
    const cookieStore = await cookies()
    cookieStore?.delete(name)
    return true
  } catch (error) {
    console.error('deleteCookie error--->', error)
    return false
  }
}


export const setCookieServerSide = async (
  name: string,
  value: string,
  days?: number

): Promise<boolean> => {
  try {
    const cookieStore = await cookies()
    cookieStore?.set(name, value, { expires: days ?? 1, sameSite: 'lax' })
    return true
  } catch (error) {
    console.error('setCookieServerSide error--->', error)
    return false
  }
}


export const getToken = async (request: NextRequest): Promise<string | null> => {
  const token = request.cookies.get('token')?.value ?? request.headers.get('Authorization')?.split(' ')?.[1] ?? null;
  return token
}

export const redirectTo = async (url: string): Promise<void> => {
  redirect(url)
}
