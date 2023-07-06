/**
 * Komponen mocking data axios
 * - onNoMatch : membiarkan akses keluar mock sesuai axios service
 * - timeout :  lama waktu tunggu maksimal
 */
import apiClient from '@/utils/apiService'
import MockAdapter from 'axios-mock-adapter'

console.warn(
	`%c ---------- MOCK ADAPTER ACTIVE ----------`,
	`color:#00ffff; background-color: #0d0d0d; padding:10px; border: 2px dashed #FCD639; border-radius: 0.8em;`
)
const mock = new MockAdapter(apiClient, {
	onNoMatch: 'passthrough',
	delayResponse: 1000
})

//  regex for dynamic subpath ex. product/item/{id}
//  new RegExp(`${urls.PRODUCT_ITEM_DETAIL}/\\S+`)

mock.onGet('/api/v1/finance/listSummary').reply(200, {
	status: true,
	code: 200,
	message: '[mock] login success',
	data: [
		{
			id: '0001',
			periode: 'Mar - 2023',
			property_name: 'Kos Alam sutra',
			total_revenue: 12500000,
			total_expense: 2530000
		},
		{
			id: '0002',
			periode: 'Feb - 2023',
			property_name: 'Kos Alam sutra',
			total_revenue: 17500000,
			total_expense: 2430000
		}
	],
	page: 1,
	per_page: 10,
	total: 2
})

mock.onGet('/api/v1/finance/report').reply(200, {
	status: true,
	code: 200,
	message: '[mock] login success',
	data: {
		property_name: 'Kos Alam Sutra',
		periode: 'Mar - 2023',
		billing: {
			old_tenant_commission_pct: 0.5,
			old_tenant_commission: 400000,
			new_tenant_commission_pct: 2.5,
			new_tenant_commission: 300000,
			reimbursement_expense: 750000,
			total_billing: 1450000
		},
		income_statement: {
			revenue: {
				rent_revenue: 1000000,

				parking_revenue: 2000000,
				others: 3000000,
				total_revenue: 6000000
			},
			expense: {
				operating_expense: 100000,
				environment_expense: 200000,
				maintenance_repairment_expense: 300000,
				salary_expense: 400000,
				other_expense: 500000,
				total_expense: 1500000
			},
			net_income: 4500000
		},
		income_details: [
			{
				no: 1,
				tenant_name: 'Susilo',
				room: '100',
				deposit: 100000,
				parking: 200000,
				others: 300000,
				keterangan: 'Dibayar lunas'
			},
			{
				no: 2,
				tenant_name: 'Santo',
				room: '200',
				deposit: 200000,
				parking: 300000,
				others: 400000,
				keterangan: 'Belum dibayar'
			}
		],
		total_income: 1500000,
		expense_details: [
			{
				expense_date: '05-03-2023',
				expense_type: 'Operating',
				description_expense: 'Karbol',
				qty: 10,
				unit_price: 25000,
				subtotal: 250000
			},
			{
				expense_date: '10-04-2023',
				expense_type: 'Repairment',
				description_expense: 'Servis AC',
				qty: 0,
				unit_price: 0,
				subtotal: 300000
			}
		],
		grand_total: 550000
	}
})

// mock.onGet('/api/v1/property').reply(200, {
// 	status: true,
// 	code: 200,
// 	message: '[mock] login success',
// 	data: [
// 		{
// 			id: '0001',
// 			name: 'Kos Alam Sari',
// 			city_lov: 'Bogor',
// 			partner_type: 'Marketing only',
// 			owner_name: 'Susilo',
// 			room_count: 3,
// 			status: '1'
// 		},
// 		{
// 			id: '0002',
// 			name: 'Kos Putri jaya',
// 			city_lov: 'Bandung',
// 			partner_type: 'Full Partnership',
// 			owner_name: 'Sandy',
// 			room_count: 2,
// 			status: '0'
// 		}
// 	],
// 	page: 1,
// 	per_page: 10,
// 	total: 2
// })
// mock.onGet("/api/v1/gallery/detail/[id]").reply(
// 	200,
// 	{
// 		status: 1,
// 		code: "200",
// 		message: "Successfully get detail gallery",
// 		data: {
// 			id: "0001",
// 			gallery_type_lov: "Web Slider",
// 			image: "imageLinkAwsS3",
// 			property_id_list: ["Kos Alam Jaya", "Kos Bantar Gebang"],
// 			link: "www.google.com",
// 			status: 1
// 		}
// 	}

// )

mock.onGet('/api/v1/suggestion/list').reply(200, {
	status: true,
	code: '200',
	message: 'Successfully get list suggestion',
	data: {
		complaint: [
			{
				id: '0001',
				suggestion_id: '2005',
				property_name: 'Kos Alam sutra',
				tenant_name: 'Santoso',
				complaint_category: 'Fasilitas Kamar',
				suggestion: 'AC sebaiknya pakai Panasonic',
				suggestion_date: '25-03-2023'
			},
			{
				id: '0002',
				suggestion_id: '2007',
				property_name: 'Kos Tegal Jaya',
				tenant_name: 'Sumarno',
				complaint_category: 'Wifi',
				suggestion: 'Router wifi kurang tengah',
				suggestion_date: '26-03-2023'
			}
		]
	},
	page: 1,
	per_page: 10,
	total: 50,
	next_page: 2,
	prev_page: null
})

mock.onGet('/api/v1/complaint/list').reply(200, {
	data: [
		{
			id: '9fcac506-61e4-4fb7-9362-fc8940f33ba8',
			complaint_id: '100423005',
			property_name: 'Kos Campur',
			room_no: '12',
			complaint_category: 'COMPLAINT_CATEGORY',
			description: 'haduuh',
			status: 'onprogress',
			complaint_date: '2023-04-13'
		}
	],
	page: 1,
	per_page: 1,
	total: 1,
	next_page: 2,
	prev_page: 0,
	success: true,
	message: 'Data retrieved successfully',
	code: 200
})
mock.onGet('/api/v1/event/onScheduleList').reply(200, {
	data: [
		{
			id: '0001',
			event_name: 'EVENT TAHUN BARU',
			event_date: '01-01-2024',
			event_time: '00:00:00',
			location: 'Monas',
			description: 'Event tahunan',
			confirm_join: 20,
			property: [
				{ id: 'property-id-1', property_name: 'Kos Asri' },
				{ id: 'property-id-2', property_name: ' Kos Amar' }
			],
			city: [
				{ id: 'city-id-1', city: 'Bandung' },
				{ id: 'city-id-2', city: 'Bogor' }
			],
			tenant_only: '1',
			organizer: 'CV Pemuda'
		},
		{
			id: '0002',
			event_name: 'EVENT NATAL',
			event_date: '25-12-2023',
			event_time: '00:00:00',
			location: 'ONLINE EVENT',
			description: 'Event natalan',
			confirm_join: 4,
			property: [
				{ id: 'property-id-1', property_name: 'Kos Asri' },
				{ id: 'property-id-2', property_name: ' Kos Amar' }
			],
			city: [
				{ id: 'city-id-1', city: 'Bandung' },
				{ id: 'city-id-2', city: 'Bogor' }
			],
			tenant_only: '0',
			organizer: 'CV Pemuda'
		}
	],
	page: 1,
	per_page: 10,
	total: 2,
	success: true,
	message: 'Data retrieved successfully',
	code: 200
})

mock.onGet('/api/v1/voucher/active/list').reply(200, {
	status: true,
	code: 200,
	message: '[mock] login success',
	data: [
		{
			id: '0001',
			voucher_type_name: 'Potongan Harga',
			name: 'Voucher potongan lebaran',
			voucher_code: ['LEB23'],
			voucher_value: 50000,
			price: 500,
			quota_per_voucher: 25,
			used_voucher: 15
		}
	],
	page: 1,
	per_page: 10,
	total: 1
})

mock.onGet(new RegExp(`/api/v1/voucher/active/detail/\\S+`)).reply(200, {
	status: true,
	code: 200,
	message: '[mock] login success',
	data: {
		id: '0359bea4-33db-4fd7-be9c-d0726ea0ea2f',
		name: 'VOUCHER MABA',
		voucher_type_id: '4fd717c3-7746-4d28-9734-e8faeef12ef3',
		description: '-D',
		term_condition: '-T',
		voucher_code_amount: 1,
		quota_per_voucher: 1,
		voucher_code_identical: 1,
		voucher_code_list: ['QWERTY'],
		voucher_value_type: 'fix',
		voucher_value: 50000,
		price: 5000,
		expired_date: '2023-07-30T18:26:31.130Z',
		brand_id: '7129f41a-e2a5-4030-8ce6-9911ca4a7913',
		image: 'https://kostzy-s3-dev.s3.ap-southeast-1.amazonaws.com/1683834117233-clipart2933428.png'
	}
})

mock.onGet('/api/v1/voucher/used/list').reply(200, {
	status: true,
	code: 200,
	message: '[mock] login success',
	data: [
		{
			id: '0001',
			voucher_type_name: 'Potongan Harga',
			name: 'Voucher potongan lebaran',
			voucher_code: ['LEB23'],
			voucher_value: 50000,
			price: 500,
			quota_per_voucher: 25,
			used_voucher: 15,
			image: 'https://kostzy-s3-dev.s3.ap-southeast-1.amazonaws.com/1683834117233-clipart2933428.png'
		}
	],
	page: 1,
	per_page: 10,
	total: 1
})

mock.onGet(' /api/v1/tenant/list').reply(200, {
	status: true,
	code: 200,
	message: 'Successfully get list tenant',
	data: [
		{
				id: "0001",
				name: "SUSILO",
				property_name: "Kos Putra Alami",
				room_no: 3,
				room_type: "Deluxe",
				checkin_date: "10-03-2023",
				checkout_date: "-",
				status: "ACTIVE"
		},
		{
				id: "0002",
				name: "UTOMO",
				property_name: "Kos Campur Wangi",
				room_no: 2,
				room_type: "Superior",
				checkin_date: "10-02-2023",
				checkout_date: "10-03-2023",
				status: "OUTSOON"
		}
],
	page: 1,
	per_page: 10,
	total: 50,
	next_page: 2,
	prev_page: null
})
