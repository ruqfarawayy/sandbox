import apiService from '@/utils/apiService'

export const getListProductCategory = async (query) =>
	await apiService
		.request({
			method: 'get',
			url: '/api/v1/product-category',
			params: query
			// headers: {
			// 	Authorization: 'Bearer ' + token
			// }
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})
