import http from '@fetch/http'

declare global {
	namespace SetLogin {
		/**
		 * @description
		 * setLogin의 요청 parameter
		 */
		interface Params {
			id: string
			password: string
		}

		/**
		 * @description
		 * getCount의 응답 결과
		 */
		interface Res {
			accessToken: string
			user: {
				email: string
				name: string
				gender: string
				created: string
			}
		}
	}
}

/**
 *
 * @param { SetLoginParmas } params
 * @return Promise<AxiosResponse<SetLogin.Res, any>>
 */
export function setLogin(params: SetLogin.Params) {
	// 로그인 API가 존재한다면 아래 처럼 하는 것이 맞지만...
	// return http.get<SetLogin.Res>('/', { params })

	// 지금은 테스트 이므로 setTimeout을 이영해 비동기를 구현
	return new Promise<SetLogin.Res>((resolve, reject) => {
		setTimeout(() => {
			resolve({
				accessToken: 'dkfj@#sdsdsdsdsd',
				user: {
					email: 'test@test.com',
					name: '김테스트',
					gender: 'm',
					created: '2022-01-28 13:40',
				},
			})
		}, 3000)
	})
}
