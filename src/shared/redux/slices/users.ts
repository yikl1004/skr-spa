import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isNull } from 'lodash-es'
import { getUsers } from '@fetch/users'

export interface UserState {
	user: any[] | null
	status: 'loading' | 'idle' | 'fail'
	isLogin: boolean
}

export const users = createAsyncThunk('users/list', async (params, api) => {
	// return 값이 제대로 넘어 갔다면 action payload는 'fullfilled'가 됩니다.
	const response = await getUsers()
	return response.data
})

const initialState: UserState = {
	user: null,
	status: 'loading',
	isLogin: false,
}

export const authSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(users.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(users.fulfilled, (state, action) => {
				state.status = 'idle'
				state.user = action.payload
				state.isLogin = !isNull(action.payload)
			})
			.addCase(users.rejected, (state, action) => {
				state.status = 'fail'
			})
	},
})

export default authSlice.reducer
