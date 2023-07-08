// import { RabbitLegacy } from 'crypto-js'
import { withSessionRoute } from '@/utils/session-wrapper'
import apiService from '@/utils/apiService'

export default withSessionRoute(async (req, res) => {
	// console.log('ini apinyaaaaa', req)
	const { email, password } = req.body
	if (req.method === 'POST') {
		try {
			const response = await apiService.request({
				method: 'post',
				url: `/api/auth/login/`,
				data: {
					email,
					password
				}
			})
			await req.session.save()
			res.status(200).send('oke')
		} catch (error) {
			console.log('ini error :', error)
			if (error?.response?.status === 404) {
				res.status(404).send({ message: 'Email atau Password Salah!', errors: ['Email atau Password Salah!'] })
			} else {
				res.status(error?.response?.status ?? 500).send(error?.response?.data, error?.response?.data ?? error)
			}
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})
