// import MapComps from '@/components/MapComp'
import Map from '@/components/Map'
import QuillEditor from '@/components/QuillEditor'
import MainTabs from '@/components/Tabs'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Space, Typography, Upload } from 'antd'
import { useRouter } from 'next/router'
const { Search } = Input
const { Title } = Typography

const AddTour = () => {
	const router = useRouter()
	const props = {
		name: 'file',
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		headers: {
			authorization: 'authorization-text'
		}
	}
	const items = [
		{ key: '/my-profile/profile', label: 'Profil Saya' },
		{
			key: '/my-profile/tour',
			label: 'Wisata Saya'
		}
	]
	const center = [51.505, -0.09]
	return (
		<>
			<Row>
				<Col>
					<MainTabs activeKey={router.pathname} items={items} tabPosition="left" />
				</Col>
				<Col span={18}>
					<div style={{ width: '100%', padding: '0 5rem' }}>
						<Title level={2}>Tambah Wisata</Title>
						<Form layout="vertical" autoComplete={false}>
							<Form.Item name="image" label="Upload Gambar">
								<Upload {...props}>
									<Button icon={<UploadOutlined />}>Click to Upload</Button>
								</Upload>
							</Form.Item>
							<Form.Item name="name" label="Nama">
								<Input placeholder="Masukan Nama Wisata" />
							</Form.Item>
							<Form.Item name="price" label="Harga">
								<Input placeholder="Rp" />
							</Form.Item>
							<Form.Item name="category" label="Kategori">
								<Input placeholder="Pilih kategori" />
							</Form.Item>
							<Form.Item name="description" label="Deskripsi">
								<QuillEditor />
							</Form.Item>
							<Form.Item name="address" label="Alamat">
								<Input placeholder="Masukkan alamat" />
							</Form.Item>
							<Form.Item>
								{/* <Map center={center} /> */}
							</Form.Item>
							<Form.Item>
								<Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
									<Button shape="round" size="large" onClick={() => router.push('/my-profile/tour')}>
										Batal
									</Button>
									<Button shape="round" type="primary" size="large">
										Simpan
									</Button>
								</Space>
							</Form.Item>
						</Form>
					</div>
				</Col>
			</Row>
		</>
	)
}

export default AddTour
