import { Avatar, Button, Col, Form, Input, Row, Typography } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import MainTabs from '@/components/Tabs'
import { withSession } from '@/utils/session-wrapper'
import axiosGroup from '@/utils/axiosGroup'
import routeGuard from '@/utils/route-guard'
import { getUserProfile } from '@/services/profile'
import ErrorPanel from '@/components/ErrorPanel'
const { Title, Text } = Typography
const Profile = ({ profileData, errors }) => {

	const dataProfile = {
		name: 'Sumirah',
		email: 'sumirah@gmail.com',
		address: 'Gunungan, Bareng Lor, Kec. Klaten Utara, Kabupaten Klaten',
		phone: '085624588664'
	}
	const [form] = Form.useForm()
	const profileDetail = (
		<>
			<ErrorPanel errors={errors} />
			<Row style={{ padding: '0 50px' }}>
				<Col span={2}>
					<Avatar size={64} icon={<UserOutlined />} />
				</Col>
				<Col span={14}>
					<div>
						<Title>{profileData.username}</Title>
						<Text>{profileData.address}</Text>
					</div>
				</Col>
				<Col>
					<Button htmlType="input" type="primary" shape="round" size="large">
						Simpan
					</Button>
				</Col>
			</Row>
			<div style={{ padding: '0 50px', marginTop: '1rem' }}>
				<Form layout="vertical" wrapperCol={{ span: 18 }} form={form} initialValues={profileData}>
					<Form.Item name="full_name" label="Nama">
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

export const getServerSideProps = withSession(async ({ req }) => {
	const access_token = req.session?.auth?.access
	const isLoggedIn = !!access_token
	const errors = []
	const validator = [isLoggedIn]
	let profileData = {}
	if (![isLoggedIn].includes(false)) {
		const [responseProfile] = await axiosGroup([getUserProfile(access_token)])
		if (responseProfile.status === 200) {
			const { data } = responseProfile.response.data
			profileData = data || {}
		} else {
			errors.push({
				message: responseProfile.error.response.data.detail
			})
		}
	}
	return routeGuard(validator, '/', {
		props: { errors, profileData }
	})
})

export default Profile
