import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import '../resources/react-calendar.css';
import { PLEASE_SELECT, ROUTES } from '../resources/constants'
import { connect } from 'react-redux'
import { setCurrentCalendarDateState } from '../redux/actions'
import { useHistory } from "react-router-dom";

const ReactCalendar = ({
	setCurrentCalendarDateState,
	returnToJournal,
	currentCalendarDateState }) => {

	let history = useHistory();

	useEffect(() => {
		if(!currentCalendarDateState) {
			history.push(ROUTES.LISTJOURNALS)
		}
	}, [])
	const handleCalendarChange = date => {
		setCurrentCalendarDateState(date)
		if (returnToJournal) {
			history.push(ROUTES.SELECT_TIME);
		} else {
			history.push(ROUTES.CALENDARSEARCH);
		}
	}
	return (
		<div className="container">
			<div className="row mt-3">
				<div className="col-12 text-center">
					<br />
					<h3 className="text-center"><b>{PLEASE_SELECT}</b></h3>
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-sm-12 col-md-6 offset-md-3 text-center">
					<hr />
					<Calendar value={currentCalendarDateState} onChange={date => { handleCalendarChange(date) }} />
					<hr />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		isExistingJournal: state.isExistingJournal,
		returnToJournal: state.returnToJournal,
		currentCalendarDateState: state.currentCalendarDateState
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setCurrentCalendarDateState: timeStamp => {
			dispatch(setCurrentCalendarDateState(timeStamp))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactCalendar);