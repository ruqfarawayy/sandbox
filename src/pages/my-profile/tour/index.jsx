import MainTable from '@/components/Table/MainTable'
import MainTabs from '@/components/Tabs'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Form, Row, Input } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
const { Search } = Input

const TourList = () => {
	const router = useRouter()
	const myTourist = (
		<>
			<div style={{ padding: '0 50px' }}>
				<Row justify="end">
					<Form layout="inline">
						<Form.Item name="name">
							<Search size="large" placeholder="Cari Wisata" enterButton="Cari" prefix={<SearchOutlined />} />
						</Form.Item>
					</Form>
					<Button
						type="primary"
						htmlType="input"
						shape="round"
						size="large"
						onClick={() => router.push('/my-profile/tour/add')}>
						Tambah
					</Button>
				</Row>
				<div style={{ marginTop: '2rem' }}>
					<MainTable
						columns={[
							{
								key: 'no',
								dataIndex: 'no',
								title: 'No'
							},
							{
								key: 'name',
								dataIndex: 'name',
								title: 'Nama'
							},
							{
								key: 'price',
								dataIndex: 'price',
								title: 'Harga'
							},
							{
								key: 'category',
								dataIndex: 'category',
								title: 'Kategori'
							},
							{
								key: 'action',
								title: 'Aksi'
							}
						]}
						rowKey="id"
					/>
				</div>
			</div>
		</>
	)
	const items = [
		{ key: '/my-profile/profile', label: 'Profil Saya' },
		{
			key: '/my-profile/tour',
			label: 'Wisata Saya',
			children: myTourist
		}
	]
	return (
		<>
			<MainTabs items={items} tabPosition="left" />
		</>
	)
}

export default TourList
