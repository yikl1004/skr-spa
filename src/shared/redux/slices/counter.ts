import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCount } from '@fetch/counter'
import type { AppThunk, RootState } from '@store/index'

export interface CounterState {
	value: number
	status: 'idle' | 'loading' | 'failed'
}

const initialState: CounterState = {
	value: 0,
	status: 'idle',
}

/**
 * 비동기 호출
 * @example
 * import React from 'react'
 * import { incrementAsync } from '@slices/counter'
 *
 * const App = () => {
 *      const dispatch = useDispatch()
 *      dispatch(incrementAsync(10))
 *
 *      return (
 *          <div>{{ counter }}</div>
 *      )
 * }
 */
export const incrementAsync = createAsyncThunk(
	'counter/fetchCount',
	async (amount: number) => {
		const response = await getCount({ amount })

		// return 값이 제대로 넘어 갔다면 action payload는 'fullfilled'가 됩니다.
		return response.data
	},
)

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			// 내부에서 'immer' 라이브러리를 사용하기 때문에 실제 값을 변경하지 않습니다.
			state.value += 1
		},
		decrement: (state) => {
			state.value -= 1
		},
		// PayloadAction 타입을 사용하여 `action.payload`를 선언합니다.
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload
		},
	},
	// 'extraReducers'는 비동기 처리 뿐만 아니라 외부에서 사용되는 것들도 가져와 사용할 수 있습니다.
	extraReducers: (builder) => {
		builder
			.addCase(incrementAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(incrementAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.value += action.payload
			})
			.addCase(incrementAsync.rejected, (state, action) => {
				console.log('falil')
			})
	},
})

// action을 내보내기 합니다.
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// selector의 예시, 주로 useSelector에서 사용
export const selectCount = (state: RootState) => state.counter.value

// thunk 함수를 직접 작성하는 것이 가능합니다.
export const incrementIfOdd =
	(amount: number): AppThunk =>
	(dispatch, getState) => {
		const currentValue = selectCount(getState())
		if (currentValue % 2 === 1) {
			dispatch(incrementByAmount(amount))
		}
	}

export default counterSlice.reducer
