import React from 'react'
import { Layout, Button, Input } from 'antd'
import { toNumber } from 'lodash-es'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import {
	selectCount,
	decrement,
	increment,
	incrementAsync,
	incrementIfOdd,
	incrementByAmount,
} from '@slices/counter'

const { Content } = Layout

export default function Counter() {
	const count = useAppSelector(selectCount)
	const dispatch = useAppDispatch()
	const [incrementAmount, setIncrementAmount] = React.useState(2)

	const onChangeAmount: React.ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		setIncrementAmount(toNumber(event.target.value))
	}

	return (
		<Content>
			<Button
				aria-label="Decrement value"
				onClick={() => dispatch(decrement())}>
				-
			</Button>
			<span>{count}</span>
			<Button
				aria-label="Increment value"
				onClick={() => dispatch(increment())}>
				+
			</Button>
			<Input
				aria-label="Set increment amount"
				value={incrementAmount}
				onChange={onChangeAmount}
			/>
			<Button
				onClick={() => dispatch(incrementByAmount(incrementAmount))}>
				Add Amount
			</Button>
			<Button onClick={() => dispatch(incrementAsync(incrementAmount))}>
				Add Async
			</Button>
			<Button onClick={() => dispatch(incrementIfOdd(incrementAmount))}>
				Add If Odd
			</Button>
		</Content>
	)
}
