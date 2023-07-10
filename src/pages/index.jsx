import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Form, Row, Typography, Input, Select, Col, Space, Pagination, Tag, Card } from 'antd'
import Image from 'next/image'
import { useEffect } from 'react'
import Link from 'next/link'
import { upper } from 'case'
import { useRouter } from 'next/router'
import { isBoolean, isEmpty, isNumber, omit, pickBy } from 'lodash'
import { withSession } from '@/utils/session-wrapper'
import { getListTouristObject, getTouristObjectCategory } from '@/services/wisata'
import axiosGroup from '@/utils/axiosGroup'
import idrFormatter from '@/utils/idrFormatter'
import { useNavbarContext } from '@/context/navbar'
const { Title, Text } = Typography
const { Search } = Input

const Dashboard = ({ profileData, isLoggedIn, touristObjectList, touristObjectListCategory, query }) => {
	const [form] = Form.useForm()
	const router = useRouter()
	const { setUserData } = useNavbarContext()

	useEffect(() => {
		setUserData({ ...profileData, isLoggedIn })
	}, [])
	const handleFilter = () => {
		// console.log('ini ya:',values)
		const values = form.getFieldsValue()
		const other = omit(query, ['total', 'per_page', 'page'])
		const params = pickBy({ ...other, ...values }, (v) => isNumber(v) || isBoolean(v) || !isEmpty(v))
		router.push({
			pathname: '/',
			query: params
		})
	}


	// console.log('ini data :', profileData)

	return (
		<>
			<Row justify="center">
				<Space direction="vertical" align="center">
					<Title>Wisata</Title>
					<hr style={{ width: '78px', height: '5px', background: '#FF7A00' }} />
					<Text>Temukan wisata menarik disini</Text>
				</Space>
			</Row>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '1rem',
					marginBottom: '1rem'
				}}>
				<Row justify="center">
					<Form form={form} colon={false} layout="inline" style={{ width: '100%' }} initialValues={query}>
						<Col span={12}>
							<Form.Item name="wisata_id">
								<Search
									size="middle"
									placeholder="Cari Wisata"
									enterButton="Cari"
									prefix={<SearchOutlined />}
									onSearch={handleFilter}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="category">
								<Select
									prefix={<FilterOutlined />}
									size="middle"
									placeholder="Pilih Kategori"
									options={touristObjectListCategory}
									allowClear
									onChange={handleFilter}
								/>
							</Form.Item>
						</Col>
					</Form>
				</Row>
			</div>
			<Row gutter={[24, 24]} style={{ marginTop: '2rem', width: '100%' }}>
				{touristObjectList.map((item, index) => (
					<Col key={`card-${index}`} {...{ xs: 24, sm: 24, md: 8, lg: 8, xl: 8 }}>
						<Link href={'/detail/' + item.slug}>
							<Card style={{ width: '100%' }} hoverable>
								<div
									style={{
										width: '100%',
										height: '100%',
										display: 'flex',
										alignItems: 'center'
									}}>
									<Image
										src={item.image}
										width="0"
										height="0"
										sizes="200px"
										style={{ width: '100%', height: 'auto', borderRadius: '0.4rem' }}
										alt="logo"
									/>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', marginBottom: '1rem' }}>
									<Tag bordered={false} color="orange" style={{ borderRadius: '10px' }}>
										{upper(item.category)}
									</Tag>
									<Text strong>{idrFormatter(parseInt(item.price))}</Text>
								</div>
								<Title level={5}>{item.name}</Title>
								<div className="text-ellipsis-2" dangerouslySetInnerHTML={{ __html: item.description.slice(0, 100) }} />
							</Card>
						</Link>
					</Col>
				))}
			</Row>
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
				<Pagination
					defaultCurrent={query?.page || 1}
					total={query.total}
					pageSize={query?.per_page || 6}
					style={{ marginTop: '2rem' }}
					onChange={(value) => {
						router.push({
							pathname: '/',
							query: {
								...query,
								page: value
							}
						})
					}}
				/>
			</div>
		</>
	)
}
export const getServerSideProps = withSession(async ({ req, query }) => {
	const access_token = req.session?.auth?.access
	const isLoggedIn = !!access_token
	const errors = []
	const { total, per_page, ...other } = query
	let queryMerge = { ...other, per_page: 6 }
	// let profileData = {}
	let touristObjectList = []
	let touristObjectListCategory = []

	const [responseTouristObject, responseTouristObjectCategory] = await axiosGroup([
		getListTouristObject(queryMerge),
		getTouristObjectCategory()
	])
	if (responseTouristObject.status === 200) {
		const { data } = responseTouristObject.response.data
		const { page, per_page, total } = responseTouristObject.response.data.meta
		touristObjectList = data || []
		queryMerge = { ...query, page, per_page, total }
	} else {
		errors.push({
			url: responseTouristObject.url,
			message: responseTouristObject.error.response.data.message
		})
	}
	if (responseTouristObjectCategory.status === 200) {
		const { data } = responseTouristObjectCategory.response.data
		touristObjectListCategory = (data || []).map((item) => ({ value: item.slug, label: item.label }))
	} else {
		errors.push({
			url: responseTouristObjectCategory.url,
			message: responseTouristObjectCategory.error.response.data.message
		})
	}
	return {
		props: {
			errors,
			isLoggedIn,
			query: queryMerge,
			touristObjectList,
			touristObjectListCategory
		}
	}
})

export default Dashboard
