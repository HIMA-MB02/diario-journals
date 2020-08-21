import React, { useEffect } from 'react'
import { ROUTES } from '../resources/constants'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatAMPM } from '../resources/common'

const CalendarButton = ({ currentDate, isExistingJournal, timeStamp }) => {
	let history = useHistory();

	const handleClick = () => {
		if (!isExistingJournal) {
			history.push(ROUTES.CALENDAR)
		}
	}
	const displayTime = () => {
		if(timeStamp) {
			return `  ${formatAMPM(timeStamp)}`
		}
		return ''
	}
	return (
		<div className="container-fluid">
			<div className="row calendar-button" onClick={() => { handleClick() }}>
				<div className="col-8 col-md-6">
					<h4 className="mb-0">
						<b><span className="text-highlight">{currentDate.month.toUpperCase()}</span>{' ' + currentDate.date + ' ' + currentDate.year.trim()}</b>
					</h4>
					<p className="text-muted">
						{`${currentDate.day.trim().toUpperCase()}`}
						<span className="text-highlight">{`${displayTime()}`}</span>
					</p>
				</div>
				<div className="col-4 col-md-2 text-right">
					<i className="fa fa-calendar fa-2x"></i>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		isExistingJournal: state.isExistingJournal
	}
}

export default connect(mapStateToProps)(CalendarButton);