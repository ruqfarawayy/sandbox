/**
 *  const imgUrl = 'https://image.jpg'
 * 
 *  const handleUpload = (file) => {
			if (file !== undefined) {
				var bodyFormData = new FormData()
				bodyFormData.append('photo', file)
				ApiService.request({
					method: 'POST',
					url: API_URLS.PROFILE_CHANGE_PICTURE,
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data'
					},
					data: bodyFormData
				})
					.then((response) => {
						return response
					})
					.catch((error) => {
						throw error
					})
			}
		}
 *
 *  <UploadProfile onReadyUpload={handleUpload} imageUrl={imgUrl} /> 
 */

import { useState, useEffect } from 'react'
import { Upload, message, Modal, Button } from 'antd'
import { LoadingOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons'
import useMediaQuery from 'use-media-antd-query'
const modalSize = {
	xs: '90%',
	sm: '90%',
	md: '65%',
	lg: '65%',
	xl: '40%',
	xxl: '40%'
}
const allowFileType = ['image/jpeg', 'image/png', 'image/jpg']
const generateRandomKey = () => `${Math.floor(Math.random() * 1000000000)}`
export const messageError = (msg) => {
	const msgKey = generateRandomKey()
	message.error({
		key: msgKey,
		duration: 12,
		content: (
			<>
				{msg}
				<Button
					style={{ marginLeft: '0.6rem' }}
					size="small"
					type="text"
					icon={<CloseOutlined style={{ margin: 'auto' }} />}
					onClick={() => message.destroy(msgKey)}
				/>
			</>
		)
	})
}
const UploadImageMultiple = ({ maxSize = 2, aspect = 1, onReadyUpload, imageUrl, ...props }) => {
	const colSize = useMediaQuery()
	const [loading, setLoading] = useState(false)
	const [fileList, setFileList] = useState([])
	// useEffect(() => {
	// 	if (!!imageUrl) {
	// 		setLoading(false)
	// 		const initState = [
	// 			{
	// 				uid: generateRandomKey(),
	// 				name: 'Photo',
	// 				status: 'done',
	// 				url: imageUrl
	// 			}
	// 		]
	// 		setFileList(initState)
	// 	}
	// }, [imageUrl])
	const getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result)
			reader.onerror = (error) => reject(error)
		})
	}
	const handleRemove = () => {
		setFileList([])
		onReadyUpload(undefined)
	}
	const beforeUpload = (file) => {
		const isJpgOrPng = allowFileType.includes(file.type)
		if (!isJpgOrPng) {
			handleRemove()
			messageError('You can only upload JPG/PNG file!')
		}

		const isLt2M = file.size / 1024 / 1024 < maxSize
		if (!isLt2M) {
			handleRemove()
			messageError(`Image must smaller than ${maxSize}MB!`)
		}
		return false
	}
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}
		Modal.info({
			title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
			centered: true,
			width: modalSize[colSize],
			footer: null,
			icon: null,
			closable: true,
			content: (
				<img
					alt="example"
					style={{
						width: '100%'
					}}
					src={file.url || file.preview}
				/>
			)
		})
	}
	const handleChange = async ({ fileList: newFileList }) => {
		console.log(newFileList)
		if (newFileList.length !== 0) {
			// if (allowFileType.includes(newFileList[0].type)) {
				setLoading(true)
				onReadyUpload(newFileList[newFileList.length-1].originFileObj).then((url) => {
					console.log(url)
					setFileList((prev) => [
						...prev,
						{
							uid: generateRandomKey(),
							name: 'Photo',
							status: 'done',
							url: url
						}
					])
				}).finally(()=>{
					setLoading(false)
				})
			// } else {
			// 	handleRemove()
			// }
		}
	}

	const UploadButton = () => (
		<div>
			{loading ? (
				<LoadingOutlined
					style={{
						fontSize: 28,
						color: 'rgba(0,0,0,0.85)'
					}}
				/>
			) : (
				<UploadOutlined
					style={{
						fontSize: 28,
						color: 'rgba(0,0,0,0.85)'
					}}
				/>
			)}
			<div
				style={{
					marginTop: 8,
					color: 'rgba(0,0,0,0.85)'
				}}>
				Upload
			</div>
		</div>
	)
	return (
		<>
			<Upload
				loading
				name="image-file"
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				beforeUpload={beforeUpload}
				onChange={handleChange}
				onRemove={handleRemove}>
				<UploadButton />
			</Upload>
		</>
	)
}

export default UploadImageMultiple
