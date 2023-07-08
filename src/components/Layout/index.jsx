import { Layout, FloatButton, theme, Modal, Button, Divider, Form, Checkbox, Input, Row, Typography, Col } from 'antd'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { DatabaseOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import axios from 'axios'
import asyncLocalStorage from '@/utils/async-local-storage'
import { withSession } from '@/utils/session-wrapper'
import routeGuard from '@/utils/route-guard'
const { Title } = Typography
const ReactJson = dynamic(() => import('react-json-view'), {
	ssr: false
})
const { Content, Header, Footer } = Layout
const LayoutComponent = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false)
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [form] = Form.useForm()
	const [modal, contextHolder] = Modal.useModal()
	const {
		token: { colorBgContainer, colorTextHeading }
	} = theme.useToken()

	const currentPath = router.pathname

	const handleSelectMenu = (menu) => {
		router.push(menu.key)
	}
	const handleSubmit = async (values) => {
		setLoading(true)
		const { email, password, remember_me } = values
		return await axios
			.request({
				method: 'post',
				url: '/api/auth/login',
				data: {
					email,
					password
				}
			})
			.then((res) => {
				// console.log('?', res)
				if (res.status === 200) {
					asyncLocalStorage.setItem('_am', res.data).then(() => {
						if (!!remember_me) {
							asyncLocalStorage.setItem('_rm', email)
						} else {
							asyncLocalStorage.setItem('_rm', '')
						}
						router.push('/')
					})
				}
			})
			.catch((err) => {
				console.log('ini error:', err)
				return err
			})
			.finally(() => setLoading(false))
	}

	const loginModal = () => {
		const instance = modal.info()
		instance.update({
			title: false,
			width: '30vw',
			bodyStyle: { height: '45vh' },
			centered: true,
			footer: null,
			icon: null,
			closable: true,
			content: (
				<div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Title level={3}>Login</Title>
					</div>
					<Form
						name="basic"
						layout="vertical"
						autoComplete="off"
						form={form}
						colon={false}
						onFinish={(values) => handleSubmit(values).then(() => instance.destroy())}>
						<Form.Item
							label="Username"
							name="email"
							rules={[
								{
									required: true,
									message: 'Please input your username!'
								}
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!'
								}
							]}>
							<Input.Password />
						</Form.Item>
						<Form.Item name="remember_me" valuePropName="checked">
							<Checkbox>Remember me</Checkbox>
						</Form.Item>
						<Form.Item>
							<Row justify="center">
								<Col>
									<Button htmlType="submit" loading={loading}>
										Login
									</Button>
								</Col>
							</Row>
						</Form.Item>
					</Form>
				</div>
			),
			onOk() {}
		})
	}

	const showProps = () =>
		Modal.info({
			title: 'Props Inspector',
			centered: true,
			width: '50vw',
			bodyStyle: { height: '60vh', overflow: 'auto' },
			footer: null,
			icon: null,
			closable: true,
			content: <ReactJson name="props" src={children.props} />
		})
	return (
		<>
			<Layout
				style={{
					minHeight: '100vh',
					background: colorBgContainer
				}}>
				<Header
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						background: colorBgContainer
					}}>
					<div>
						<Image src="/logo.png" alt="logo" width={100} height={50} />
					</div>
					<div>
						<Button size="large" shape="round" type="primary" onClick={loginModal}>
							Login
						</Button>
					</div>
				</Header>
				{/* <Sider
				collapsible
				width={250}
				style={{
					backgroundColor: colorBgContainer
				}}
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}>
				<div
					style={{
						height: 48,
						margin: 16,
						background: colorBgContainer,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<span
						style={{
							fontWeight: 600,
							fontSize: '2rem',
							color: colorTextHeading
						}}>
						{collapsed ? 'L' : 'LOGO'}
					</span>
				</div>
				<Menu theme="light" defaultSelectedKeys={[currentPath]} mode="inline" items={menus} onSelect={handleSelectMenu} />
			</Sider> */}
				<Content
					style={{
						margin: '0 1rem',
						minHeight: 'calc(100vh-2rem)',
						padding: '0 50px' // minHeight = heigh of screen - (margin top + margin bottom)
					}}>
					<FloatButton shape="circle" style={{ right: 60 }} onClick={showProps} type="primary" icon={<DatabaseOutlined />} />
					<div
						style={{
							padding: 24,
							height: '100%',
							background: colorBgContainer,
							minHeight: 28
						}}>
						{children}
					</div>
				</Content>
				<Footer style={{ backgroundColor: '#2B2C2B' }}>
					<div>
						<Image src="/logo.png" alt="logo" width={100} height={50} />
						<Divider style={{ width: '80%', backgroundColor: '#FFFFFF4D' }} />
					</div>
				</Footer>
			</Layout>
			{contextHolder}
		</>
	)
}
export default LayoutComponent
