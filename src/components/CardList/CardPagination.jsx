import { Pagination } from 'antd'

const CardPagination = ({ currentPage, totalPages, onPageChange }) => {
	return <Pagination current={currentPage} total={totalPages} onChange={onPageChange} />
}

export default CardPagination
