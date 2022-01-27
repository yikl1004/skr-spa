import type { FC } from 'react'
import { Layout, Row, Col, Avatar } from 'antd'
import { Logo } from '@components/common'
import { UserOutlined } from '@ant-design/icons'

const { Header } = Layout

interface Props {}

export const AppHeader: FC<Props> = () => {
	return (
		<Header>
			<Row justify="space-between">
				<Col span={4}>
					<Logo />
				</Col>
				<Col span={4}>
					<Avatar size="large" icon={<UserOutlined />} />
					<span style={{ color: '#fff', paddingLeft: '10px' }}>
						관리자
					</span>
				</Col>
			</Row>
		</Header>
	)
}
