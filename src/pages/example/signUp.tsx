import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { omit } from 'lodash-es'
import { Button, Checkbox, Input, Form, Select, Radio, DatePicker } from 'antd'
import { signUpScheme } from '@lib/validate/signUp'
import moment, { Moment } from 'moment'

type SignUpFormData = {
	userId: string
	password: string
	term: boolean
	fruits: string[]
	animals: string
	alphabet: string
	date: string | null
}
type FormItemData = { label: string; value: string }

const Message: React.FC<{ message: string }> = ({ message }) => {
	return <strong style={{ color: 'red' }}>{message}</strong>
}
const renderFormItemToArray = (
	list: FormItemData[],
	Component: typeof Select.Option | typeof Radio,
) => {
	// <Select.Option value={value}>{label}</Select.Option>
	// <Radio value={value}>{label}</Radio>
	return list.map(({ value, label }) => (
		<Component value={value}>{label}</Component>
	))
}

export default function SignUpPage() {
	const [checkboxValues] = React.useState<FormItemData[]>([
		{ label: '사과', value: 'apple' },
		{ label: '오렌지', value: 'orange' },
		{ label: '바나나', value: 'banana' },
		{ label: '딸기', value: 'strawberry' },
	])
	const [selectOptions] = React.useState<FormItemData[]>([
		{ value: 'lion', label: '사자' },
		{ value: 'rabbit', label: '토끼' },
		{ value: 'monkey', label: '원숭이' },
		{ value: 'cow', label: '젖소' },
		{ value: 'tiger', label: '호랑이' },
	])
	const [radioGroup] = React.useState<FormItemData[]>([
		{ label: 'a', value: 'a' },
		{ label: 'b', value: 'b' },
		{ label: 'c', value: 'c' },
		{ label: 'd', value: 'd' },
		{ label: 'e', value: 'e' },
	])
	const {
		handleSubmit,
		formState: { errors },
		control,
		getValues,
	} = useForm<SignUpFormData>({
		mode: 'onBlur',
		resolver: signUpScheme,
		defaultValues: {
			term: false,
		},
	})

	const onSubmit = handleSubmit((data) => {
		console.log('submit data : ', data)
	})

	console.log('values', getValues())

	return (
		<Form onFinish={onSubmit}>
			<Controller
				control={control}
				name="userId"
				render={({ field }) => (
					<Input placeholder="이메일" type="text" {...field} />
				)}
			/>
			<ErrorMessage errors={errors} name="userId" render={Message} />

			<Controller
				control={control}
				name="password"
				render={({ field }) => (
					<Input placeholder="비밀번호" type="password" {...field} />
				)}
			/>
			<ErrorMessage errors={errors} name="password" render={Message} />
			<div>
				<span>저장 여부</span>
				<Controller
					control={control}
					name="term"
					render={({ field }) => (
						<Checkbox
							checked={field.value}
							{...omit(field, 'value')}
						/>
					)}
				/>
			</div>
			<div>
				<Controller
					control={control}
					name="fruits"
					render={({ field }) => (
						<Checkbox.Group {...field} options={checkboxValues} />
					)}
				/>
				<ErrorMessage errors={errors} name="fruits" render={Message} />
			</div>

			<div>
				<Controller
					control={control}
					name="animals"
					render={({ field }) => (
						<Select placeholder="동물 선택" {...field}>
							{renderFormItemToArray(
								selectOptions,
								Select.Option,
							)}
						</Select>
					)}
				/>
				<ErrorMessage errors={errors} name="animals" render={Message} />
			</div>

			<div>
				<Controller
					control={control}
					name="alphabet"
					render={({ field }) => (
						<Radio.Group {...field}>
							{renderFormItemToArray(radioGroup, Radio)}
						</Radio.Group>
					)}
				/>
				<ErrorMessage
					errors={errors}
					name="alphabet"
					render={Message}
				/>
			</div>

			<div>
				<Controller
					control={control}
					name="date"
					render={({ field }) => (
						<DatePicker
							{...omit(field, ['value', 'onChange'])}
							value={moment(field.value)}
							onChange={(date) =>
								field.onChange(
									(date as Moment).format('YYYY/MM/DD'),
								)
							}
							picker="date"
						/>
					)}
				/>
			</div>

			<div style={{ marginTop: '50px' }}>
				<Button type="primary" htmlType="submit">
					submit
				</Button>
			</div>
		</Form>
	)
}
