/* eslint-disable react/jsx-no-target-blank */
import React from 'react'

export default function Index() {
	return <></>
}

export function getServerSideProps() {
	return {
		redirect: {
			destination: '/dashboard'
		}
	}
}
