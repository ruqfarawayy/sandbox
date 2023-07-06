import {
	UserOutlined,
	DashboardOutlined,
	GlobalOutlined,
	DatabaseOutlined,
	HomeOutlined,
	CreditCardOutlined
} from '@ant-design/icons'

/**
 * key === path page without trailing slash, check window.location.pathname
 */

const menus = [
	{
		key: '/master-data',
		label: 'Master Data',
		icon: <DatabaseOutlined />,
		children: [
			{
				key: '/master-data/product-category',
				label: 'product-category',
				icon: <DatabaseOutlined />
			}
		]
	}
]

export default menus
