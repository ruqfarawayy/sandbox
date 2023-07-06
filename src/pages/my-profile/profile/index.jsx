import { Avatar, Button, Col, Form, Input, Row, Typography } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import MainTabs from '@/components/Tabs'
const { Title, Text } = Typography
const Profile = () => {
	const dataProfile = {
		name: 'Sumirah',
		email: 'sumirah@gmail.com',
		address: 'Gunungan, Bareng Lor, Kec. Klaten Utara, Kabupaten Klaten',
		phone: '085624588664'
	}
	const [form] = Form.useForm()
	const profileDetail = (
		<>
			<Row style={{ padding: '0 50px' }}>
				<Col span={2}>
					<Avatar size={64} icon={<UserOutlined />} />
				</Col>
				<Col span={14}>
					<div>
						<Title>{dataProfile.name}</Title>
						<Text>{dataProfile.address}</Text>
					</div>
				</Col>
				<Col>
					<Button htmlType="input" type="primary" shape="round" size="large">
						Simpan
					</Button>
				</Col>
			</Row>
			<div style={{ padding: '0 50px', marginTop: '1rem' }}>
				<Form layout="vertical" wrapperCol={{ span: 18 }} form={form} initialValues={dataProfile}>
					<Form.Item name="name" label="Nama">
						<Input />
					</Form.Item>
					<Form.Item name="email" label="Email">
						<Input />
					</Form.Item>
					<Form.Item name="address" label="Alamat">
						<Input.TextArea />
					</Form.Item>
					<Form.Item name="phone" label="No Handphone">
						<Input />
					</Form.Item>
				</Form>
			</div>
		</>
	)

	const items = [
		{ key: '/my-profile/profile', label: 'Profil Saya', children: profileDetail },
		{
			key: '/my-profile/tour',
			label: 'Wisata Saya'
		}
	]
	return (
		<>
			<MainTabs items={items} tabPosition="left" />
		</>
	)
}

export default Profile
