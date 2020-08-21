import React, { useState, useEffect } from 'react'
import { SEARCH_CALENDAR, DATE_OPTIONS } from '../resources/constants'
import JournalsForADay from './JournalsForADay'
import { setIsExistingJournal, setCurrentCalendarDateState } from '../redux/actions'
import { connect } from 'react-redux'
import CalendarButton from './CalendarButton'
import { getJournalsForDate } from '../api/api'
const CalendarSearch = ({ currentCalendarDateState, setIsExistingJournal, setCurrentCalendarDateState }) => {
	const [currentDate, setCurrentDate] = useState({
		day: '',
		month: '',
		date: '',
		year: ''
	})
	const [journals, setJournals] = useState([])
	useEffect(() => {
		setIsExistingJournal(false);
		let displayDate;
		if (currentCalendarDateState) {
			displayDate = currentCalendarDateState.toLocaleDateString("en-US", DATE_OPTIONS).split(',');
		} else {
			let newDate = new Date();
			displayDate = newDate.toLocaleDateString("en-US", DATE_OPTIONS).split(',');
			setCurrentCalendarDateState(newDate)
		}
		const [month, date] = displayDate[1].trim().split(' ')
		setCurrentDate({
			...currentDate,
			day: displayDate[0].trim(),
			month: month.trim(),
			date: date.trim(),
			year: displayDate[2].trim()
		})
	}, [])
	useEffect(() => {
		(async () => {
			try {
				if (currentDate.day) {
					let response = await getJournalsForDate(currentDate);
					setJournals(response)
				}
			} catch (error) {
				console.log(error)
			}
		})()
	}, [currentDate])

	return (
		<>
			{/* <ReactCalendar /> */}
			<div className="container">
				<div className="row mt-3 p-2">
					<div className="col-12 col-md-7">
						<h3 className="text-center"><b>{SEARCH_CALENDAR}</b></h3>
					</div>
					<div className="col-12 col-md-5">
						<hr className="d-sm-none d-block" />
						<CalendarButton currentDate={currentDate} />
					</div>
				</div>

				{journals.length <= 0 && (
					<>
						<hr className="d-none d-md-block m-0" />
						<div className="row">
							<div className="col-12 p-5">
								<h5 className="text-danger text-center">
									No journals on this day!
								{console.log(currentDate)}
								</h5>
							</div>
						</div>
					</>
				)}
				<JournalsForADay journals={journals} />
			</div>
		</>
	)
}

const mapStateToProps = state => {
	return {
		currentCalendarDateState: state.currentCalendarDateState,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setIsExistingJournal: isExisting => {
			dispatch(setIsExistingJournal(isExisting))
		},
		setCurrentCalendarDateState: timeStamp => {
			dispatch(setCurrentCalendarDateState(timeStamp))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSearch);