import axios from 'axios'
import { isDev } from '@lib/index'

const baseURL = isDev ? '/' : process.env.NEXT_PUBLIC_API_URL

const http = axios.create({
	baseURL,
	withCredentials: true,
})

http.interceptors.request.use(
	(requestConfig) => {
		return requestConfig
	},
	(error) => {
		// error 객체가 맞지만 static property들이 존재하므로 오류된 원인을 분석할 수 있습니다.
		return error
	},
)

http.interceptors.response.use(
	(responseConfig) => {
		return responseConfig
	},
	(error) => {
		// error 객체가 맞지만 static property들이 존재하므로 오류된 원인을 분석할 수 있습니다.
		return error
	},
)

export default http
