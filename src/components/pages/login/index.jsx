import { Button, Form, Input, Checkbox, message } from 'antd'
import axios from 'axios'
const { useForm } = Form
import { useRouter } from 'next/router'
import { useState } from 'react'
const Login = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [form] = useForm()
	const router = useRouter()
	const handleSubmit = async (values) => {
		setIsLoading(true)
		const { username, password } = values
		axios
			.request({
				method: 'post',
				url: '/api/auth/login',
				data: { username, password }
			})
			.then((res) => {
        if(res.status === 200){
          router.push('/master-data/product-category')
        }
			}).catch(err=>{
        // message.error(err.response.status)
        if(err.response.status === 400){
          message.error((err.response?.data?.message||[]).join(' - '))
        }
        if(err.response.status === 404){
          message.error((err.response?.data?.message||[]))
        }
      })
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<Form
			initialValues={{ remember: false }}
			form={form}
			name="basic"
			labelCol={{
				sm: {
					span: 6
				}
			}}
			wrapperCol={{
				sm: {
					span: 18
				}
			}}
			autoComplete="off"
			onFinish={handleSubmit}>
			<Form.Item
				label="Username"
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your username!'
					}
				]}>
				<Input />
			</Form.Item>
			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your password!'
					}
				]}>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="remember"
				valuePropName="checked"
				wrapperCol={{
					sm: {
						offset: 6,
						span: 18
					}
				}}>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>
			<Form.Item
				wrapperCol={{
					sm: {
						offset: 6,
						span: 18
					}
				}}>
				<Button
					shape="round"
					size="large"
					style={{
						background: '#001253'
					}}
					type="primary"
					htmlType="submit"
					loading={isLoading}>
					Masuk
				</Button>
			</Form.Item>
		</Form>
	)
}

export default Login
