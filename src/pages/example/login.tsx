import { Form, Input, Checkbox, Button, Layout } from 'antd'

interface LoginFormValues {
	email: string
	password: string
	remember: boolean
}

export default function Login() {
	const onFinish = (values: LoginFormValues) => {
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Layout.Content
			style={{
				padding: '50px',
				backgroundColor: '#fff',
				minHeight: '100%',
			}}>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off">
				<Form.Item
					label="이메일"
					name="email"
					rules={[
						{
							required: true,
							message: '이메일을 입력해주세요!',
						},
					]}>
					<Input placeholder="test@test.com" />
				</Form.Item>

				<Form.Item
					label="비밀번호"
					name="password"
					rules={[
						{
							required: true,
							message: '비밀번호를 입력해주세요!',
						},
					]}>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="remember"
					valuePropName="checked"
					wrapperCol={{ offset: 8, span: 16 }}>
					<Checkbox>기억하기</Checkbox>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						로그인
					</Button>
				</Form.Item>
			</Form>
		</Layout.Content>
	)
}
