import apiService from '@/utils/apiService'

export const getListTouristObject = async (query) =>
	await apiService
		.request({
			method: 'get',
			url: '/api/tourist-object/tourist-object/',
			params: query
			// headers: {
			// 	Authorization:
			// 		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTMzNTg2LCJpYXQiOjE2ODg1MjYzODYsImp0aSI6ImRhZmU0MTE0YWZjMjQ5NGU5MDRhZmJhMWFlNWZkZjhmIiwidXNlcl9pZCI6MTB9.Cf90hqEYZQ7gOgmcK6E6up1LEovaIsMvyoTPZKYRT_Q'
			// }
		})
		.then((res) => {
			return res
		})
		.catch((err) => {
			throw err
		})
