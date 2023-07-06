// import { withSession } from '@/utils/session-wrapper'
const RedirectEmpty = () => {
	return <></>
}
export default RedirectEmpty
export const getServerSideProps = async () => {
	return {
		redirect: {
			destination: '/my-profile/profile',
			permanent: false
		}
	}
}
