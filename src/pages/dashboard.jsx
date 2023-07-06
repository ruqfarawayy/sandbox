import CardGrid from '@/components/CardList/CardGrid'
import CardPagination from '@/components/CardList/CardPagination'
import { getListTouristObject } from '@/services/wisata'
import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Divider, Form, Row, Typography, Input, Select, Col, Card, Space } from 'antd'
import { useState } from 'react'

const { Title, Text } = Typography
const { Search } = Input
const PAGE_SIZE = 6

const Dashboard = ({ dataTourist }) => {
	const [form] = Form.useForm()
	const [currentPage, setCurrentPage] = useState(1)

	const handlePageChange = (page) => {
		setCurrentPage(page)
	}

	const startIndex = (currentPage - 1) * PAGE_SIZE
	const paginatedProducts = dataTourist.slice(startIndex, startIndex + PAGE_SIZE)

	const totalPages = Math.ceil(dataTourist.length / PAGE_SIZE)
	// console.log('ini totalPages :', totalPages)
	return (
		<>
			<Row justify="center">
				<Space direction="vertical" align="center">
					<Title>Wisata</Title>
					<hr style={{ width: '78px', height: '5px', background: '#FF7A00' }} />
					<Text>Temukan wisata menarik disini</Text>
				</Space>

				{/* <Divider style={{height:5, backgroundColor:'#FF7A00'}}/> */}
			</Row>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '1rem',
					marginBottom: '1rem'
				}}>
				<Row justify="center">
					<Form form={form} colon={false} layout="inline" style={{ width: '100%' }}>
						<Col span={12}>
							<Form.Item name="wisata_id">
								<Search size="middle" placeholder="Cari Wisata" enterButton="Cari" prefix={<SearchOutlined />} />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="filter">
								<Select prefix={<FilterOutlined />} size="middle" placeholder="Pilih Kategori" />
							</Form.Item>
						</Col>
					</Form>
				</Row>
			</div>
			<CardGrid data={paginatedProducts} />
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
				<CardPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
			</div>
		</>
	)
}
export const getServerSideProps = async (query) => {
	let dataTourist = []
	try {
		const responseData = await getListTouristObject(query)
		if (responseData.status === 200) {
			const { data } = responseData.data
			dataTourist = data
		}
	} catch (err) {
		console.log('ini error mas:', err)
		return err
	}
	// console.log('dataTourist :', dataTourist)
	return {
		props: {
			dataTourist
		}
	}
}

export default Dashboard
