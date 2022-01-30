import React from 'react'
import { useAppSelector, shallowEqual } from '@lib/hooks'
import { selectUser } from '@slices/auth'

interface Props {
	auth?: boolean
}

export const RouterGuard: React.FC<Props> = ({ children }) => {
	const auth = useAppSelector(selectUser, shallowEqual)

	if (auth) {
		return <>{children}</>
	} else {
		return <></>
	}
}
