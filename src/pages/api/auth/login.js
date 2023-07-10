import { pick } from 'lodash'

import { withSessionRoute } from '@/utils/session-wrapper'
import apiService from '@/utils/apiService'

export default withSessionRoute(async (req, res) => {
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
			const pickProperty = pick(response?.data, ['access', 'refresh'])
			req.session.auth = pickProperty
			await req.session.save()
			res.status(200).send('ok')
		} catch (error) {
			if (error?.response?.status === 404) {
				res.status(404).send({ message: 'Email atau Password Salah!', errors: ['Email atau Password Salah!'] })
			}
			if (error?.response?.status === 401) {
				res.status(401).send({ message: 'Email atau Password Salah!', errors: [error?.response.data.detail] })
			} else {
				res.status(error?.response?.status ?? 500).send(error?.response?.data, error?.response?.data ?? error)
			}
		}
	} else {
		res.status(405).send({ message: 'Method not allowed' })
	}
})
