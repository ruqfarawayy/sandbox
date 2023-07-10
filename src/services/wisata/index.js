import apiService from '@/utils/apiService'

export const getListTouristObject = async (query) =>
	await apiService
		.request({
			method: 'get',
			url: '/api/tourist-object/tourist-object/',
			params: {...query}
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})

		export const getTouristObjectCategory = async () =>
	await apiService
		.request({
			method: 'get',
			url: '/api/datamaster/tourist-object-category/',
			params: {
				page: 1,
				per_page: Number.MAX_VALUE
			}
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})
