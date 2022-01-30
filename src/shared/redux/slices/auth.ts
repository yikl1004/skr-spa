import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setLogin } from '@fetch/auth'
import type { RootState } from '@store/index'

export interface AuthState {
	token: undefined | string
	isLogin: boolean
	user: SetLogin.Res['user'] | null
	status: 'loading' | 'pending' | 'fulfilled'
}

const initialState: AuthState = {
	token: undefined,
	isLogin: false,
	status: 'loading',
	user: null,
}

export const login = createAsyncThunk<SetLogin.Res, SetLogin.Params>(
	'auth/login',
	async (params) => {
		const response = await setLogin(params)
		// return 값이 제대로 넘어 갔다면 action payload는 'fullfilled'가 됩니다.
		return response
	},
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	// 'extraReducers'는 비동기 처리 뿐만 아니라 외부에서 사용되는 것들도 가져와 사용할 수 있습니다.
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'fulfilled'
				state.token = action.payload.accessToken
				state.user = action.payload.user
			})
			.addCase(login.rejected, (state, action) => {
				// reject 처리.. 초기화를 한다 던가 하는
				console.log('falil')
			})
	},
})

// action을 내보내기 합니다.
// 여기서는 createSlice에 reducer가 존재하지 않기 때문에 반환되는 action이 없습니다.

// selector의 예시, 주로 useSelector에서 사용
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
