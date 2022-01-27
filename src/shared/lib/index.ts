/**
 * @description 현재 node 환경이 'development'인지 판별
 */
export const isDev = process.env.NODE_ENV === 'development'

/**
 * @description 현재 환경이 서버인지 확인 합니다.
 */
export const isServer = typeof window === 'undefined'
