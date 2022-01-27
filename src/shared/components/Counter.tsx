import type { FC } from 'react'
import React from 'react'

interface Props {}

const Counter: FC<Props> = () => {
	const [count, setCount] = React.useState<number>(0)

	return (
		<>
			<span>{{}}</span>
			<button type="button" onClick={() => setCount(count + 1)}></button>
		</>
	)
}
