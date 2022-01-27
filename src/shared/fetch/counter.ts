import http from '@fetch/http'

/**
 * @description
 * getCount의 요청 parameter
 */
interface GetCountParmas {
	amount?: number
}

/**
 * @description
 * getCount의 응답 결과
 */
type GetCountRes = number

/**
 *
 * @param {GetCountParmas} params
 * @returns
 */
export function getCount(params: GetCountParmas) {
	return http.get<GetCountRes>('/', { params })
}
