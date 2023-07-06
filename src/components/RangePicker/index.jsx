import { DatePicker } from 'antd'
import React from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'

/**
 * Main DatePicker
 * @param   {string} valueFormat date format used to adjust the given value
 * @param   {string} parseFormat date format used to adjust the return value
 */

const { RangePicker } = DatePicker
const MainRangePicker = ({ style, onChange, valueFormat, parseFormat, value, ...props }) => {
	const dateValue =
		value !== null && (value || []).length === 2
			? [dayjs(value[0], valueFormat), dayjs(value[1], valueFormat)]
			: undefined
	return (
		<RangePicker
			{...props}
			value={dateValue}
			onChange={(dates, datesString) => {
				onChange(
					dates !== null && (dates || []).length === 2
						? !!parseFormat
							? [dates[0].format(parseFormat), dates[1].format(parseFormat)]
							: [dates[0].toISOString(), dates[1].toISOString()]
						: null,
					datesString
				)
			}}
			style={{ ...style }}
		/>
	)
}
MainRangePicker.propTypes = {
	parseFormat: PropTypes.string,
	valueFormat: PropTypes.string
}
export default MainRangePicker
