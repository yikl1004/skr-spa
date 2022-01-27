import Link from 'next/link'
import { Menu } from 'antd'
import {
	AppstoreOutlined,
	MailOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import type { MenuClickEventHandler } from 'rc-menu/lib/interface'

const { SubMenu, ItemGroup, Item } = Menu

interface Props {}

export const Sidebar: React.FC<Props> = (props) => {
	const onClickMenu: MenuClickEventHandler = (info) => {
		console.log('메뉴 클릭 정보', info)
	}

	return (
		<Menu
			onClick={onClickMenu}
			style={{ width: 256 }}
			defaultSelectedKeys={['1']}
			defaultOpenKeys={['sub1']}
			mode="inline">
			<SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
				<ItemGroup key="g1" title="Examples">
					<Item key="1">
						<Link href="/example/counter">Counter</Link>
					</Item>
					<Item key="2">
						<Link href="/example/forms">Forms</Link>
					</Item>
					<Item key="3">
						<Link href="/example/login">Login</Link>
					</Item>
					<Item key="4">
						<Link href="/example/grid">Grid</Link>
					</Item>
					<Item key="5">
						<Link href="/example/portal">Portal</Link>
					</Item>
				</ItemGroup>
				<ItemGroup key="g2" title="Item 2">
					<Item key="g2-1">Option 3</Item>
					<Item key="g2-2">Option 4</Item>
				</ItemGroup>
			</SubMenu>
			<SubMenu
				key="sub2"
				icon={<AppstoreOutlined />}
				title="Navigation Two">
				<Item key="sub2-1">Option 5</Item>
				<Item key="sub2-2">Option 6</Item>
				<SubMenu key="sub3" title="Submenu">
					<Item key="sub3-1">Option 7</Item>
					<Item key="sub3-2">Option 8</Item>
				</SubMenu>
			</SubMenu>
			<SubMenu
				key="sub4"
				icon={<SettingOutlined />}
				title="Navigation Three">
				<Item key="sub4-1">Option 9</Item>
				<Item key="sub4-2">Option 10</Item>
				<Item key="sub4-3">Option 11</Item>
				<Item key="sub4-4">Option 12</Item>
			</SubMenu>
		</Menu>
	)
}
