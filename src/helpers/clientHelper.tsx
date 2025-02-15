
export const getCookieClientSide = (name: string): string | null => {
    const nameEQ = `${name}=`
    const cookies = document.cookie.split(';')
  
    for (let cookie of cookies) {
      cookie = cookie.trim() // Remove leading whitespace
      if (cookie.startsWith(nameEQ)) {
        return cookie.substring(nameEQ.length, cookie.length)
      }
    }
  
    return null // Return null if the cookie is not found
  }
  
  export const setCookieClientSide = (name: string, value: string, days?: number): void => {
    let expires = ''
    if (days != null) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // Calculate expiration time
      expires = `; expires=${date.toUTCString()}` // Format expiration date
    }
    document.cookie = `${name}=${value ?? ''}${expires}; path=/`
  }
  
  export const deleteCookieClientSide = (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  }
  
  export const replaceInvalidSegment = (url: string, id: string): string => {
    return url.replace(/\/(null|undefined)(\/|$)/, `/${id}$2`)
  }