import { Card, Tag, Image } from 'antd'
import idrFormatter from '@/utils/idrFormatter'
const { Meta } = Card

const CardData = ({ item }) => {
	const maxDescriptionLength = 100
	const text =
		item.description.length > maxDescriptionLength
			? `${item.description.slice(0, maxDescriptionLength)}...`
			: item.description
	return (
		<Card cover={<Image height={250} alt="example" src={item.image} />} style={{ width: '100%' }} hoverable>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
				<Tag color="orange">{item.category}</Tag>
				<p>{idrFormatter(item.price)}</p>
			</div>
			<Meta
				title={item.title}
				description={
					<>
						<div dangerouslySetInnerHTML={{ __html: text }} />
					</>
				}
			/>
		</Card>
	)
}

export default CardData
