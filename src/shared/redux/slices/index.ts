import { combineReducers } from '@reduxjs/toolkit'
import CounterReducer from '@slices/counter'
import type { CounterState } from '@slices/counter'
import UserSlice from '@slices/users'
import type { UserState } from '@slices/users'

export interface IState {
	counter: CounterState
	users: UserState
}
const rootReducer = combineReducers({
	counter: CounterReducer,
	users: UserSlice,
})

export type ReducerType = ReturnType<typeof rootReducer>
export default rootReducer
