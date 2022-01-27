import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const scheme = yup.object({
	userId: yup.string().required('입력값이 없습니다.'),
	password: yup
		.string()
		.required('비밀번호를 입력해주세요.')
		.min(8, '8자 이상이어야 합니다.')
		.max(12, '12자리 이하여야 합니다.')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/g,
			'대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상 포함하여야 합니다.',
		),
	term: yup.bool().oneOf([true], '동의해 주세요.'),
	fruits: yup
		.array()
		.of(yup.string())
		.min(2, '2개 이상 선택')
		.required('선택하세요'),
	animals: yup.string().required('선택해주세요'),
	alphabet: yup.string().required('알파벳을 선택해주세요'),
})

export const signUpScheme = yupResolver(scheme)
