import { Row, Col } from 'antd'
// import ProductCard from './ProductCard';
import CardData from './CardData'

const CardGrid = ({ data }) => {
	// const params = data
	// console.log('ini data:', params)
	return (
		<>
			<Row gutter={[24, 24]}>
				{data.map((item) => (
					<Col key={item.slug} span={8}>
						<CardData item={item} />
					</Col>
				))}
			</Row>
		</>
	)
}

export default CardGrid
