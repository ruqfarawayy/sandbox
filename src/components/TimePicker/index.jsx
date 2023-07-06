import { TimePicker } from 'antd'
import React from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

/**
 * Main DatePicker
 * @param   {string} valueFormat date format used to adjust the given value
 * @param   {string} parseFormat date format used to adjust the return value
 */
const MainTimePicker = ({ style, onChange, valueFormat, parseFormat, value, ...props }) => {
	const timeValue = !!value ? dayjs(value, valueFormat) : undefined
	return (
		<TimePicker
			{...props}
			value={timeValue}
			onChange={(time, timeString) => {
				onChange(time !== null ? (!!parseFormat ? time.format(parseFormat) : time.toISOString()) : null, timeString)
			}}
			style={{ width: '100%', ...style }}
		/>
	)
}
MainTimePicker.propTypes = {
	parseFormat: PropTypes.string,
	valueFormat: PropTypes.string
}
export default MainTimePicker
