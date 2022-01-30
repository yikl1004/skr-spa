import { combineReducers } from '@reduxjs/toolkit'
import CounterReducer from '@slices/counter'
import type { CounterState } from '@slices/counter'
import UserSlice from '@slices/users'
import type { UserState } from '@slices/users'
import AuthSlice from '@slices/auth'
import type { AuthState } from '@slices/auth'

export interface IState {
	counter: CounterState
	users: UserState
	auth: AuthState
}
const rootReducer = combineReducers({
	counter: CounterReducer,
	users: UserSlice,
	auth: AuthSlice,
})

export type ReducerType = ReturnType<typeof rootReducer>
export default rootReducer
