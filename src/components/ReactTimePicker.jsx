import React, { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker'
import { PLEASE_SELECT, ROUTES, DATE_OPTIONS } from '../resources/constants'
import '../resources/react-time-picker.css';
import { setCurrentCalendarDateState } from '../redux/actions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isDateTimeAvailable } from '../api/api'

const ReactTimePicker = ({ currentCalendarDateState, setCurrentCalendarDateState }) => {
	let history = useHistory();
	const [value, onChange] = useState('00:00');
	const [error, setError] = useState('')
	const [currentDate, setCurrentDate] = useState({
		day: '',
		month: '',
		date: '',
		year: ''
	})
	useEffect(() => {
		console.log(currentCalendarDateState)
		if (currentCalendarDateState) {
			const displayDate = currentCalendarDateState.toLocaleDateString("en-US", DATE_OPTIONS).split(',');
			const [month, date] = displayDate[1].trim().split(' ')
			setCurrentDate({
				...currentDate,
				day: displayDate[0].trim(),
				month: month.trim(),
				date: date.trim(),
				year: displayDate[2].trim()
			})
		} else {
			history.push(ROUTES.LISTJOURNALS)
		}
	}, [currentCalendarDateState])
	const handleSubmit = () => {
		const [hours, minutes] = value.split(':')
		let calendarTime = new Date(currentCalendarDateState);
		calendarTime.setHours(hours);
		calendarTime.setMinutes(minutes);
		console.log('here, datetime')
		isDateTimeAvailable(calendarTime).then(res => {
			if(res.isAvailable) {
				setCurrentCalendarDateState(calendarTime)
				history.push(ROUTES.JOURNAL);
			} else {
				setError(res.message)
			}
		}).catch(err => {
			console.log(err)
		})
	}
	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-12 text-center">
					<h3><b>{PLEASE_SELECT}</b></h3>
					<hr />
				</div>
			</div>
			<div className="row mt-3">
				<div className="col-12 col-md-6">
					<div className="container-fluid">
						<div className="row mt-3">
							<div className="col-6 col-md-5 offset-md-5 text-center">
								<h4 className="mb-0">
									<b>
										<span className="text-highlight">{currentDate.month.toUpperCase()}</span>{' ' + currentDate.date}
									</b>
								</h4>
								<p className="text-muted">
									{currentDate.day.trim().toUpperCase()}
								</p>
							</div>
							<div className="col-6 col-md-1">
								<h4 className="text-muted text-center">
									{currentDate.year.trim()}
								</h4>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-6">
					<div className="container-fluid">
						<div className="row">
							<div className="col-12 col-md-8">
								<hr className="d-sm-none d-block"/>
								<TimePicker value={value} onChange={onChange} format={'hh:mm a'} />
							</div>
						</div>

					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-12 col-md-4 offset-md-4 text-center mt-5">
					<button className="btn btn-info btn-block" onClick={() => handleSubmit()}>
						Done
					</button>
					{error ? <p className="text-danger p-1">{error}</p>:null}
				</div>
			</div>
		</div>
	)
}
const mapStateToProps = state => {
	return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ReactTimePicker);