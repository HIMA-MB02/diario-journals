import React, { useEffect, useState } from 'react';
import { DATE_OPTIONS, ROUTES } from '../resources/constants'
import CalendarButton from './CalendarButton';
import { connect } from 'react-redux';
import RichEditor from './RichEditor';
import { useHistory } from 'react-router-dom';
import {getJournalDataForDate, saveJournalData} from '../api/api';
import { setCurrentCalendarDateState, addDetailsToStatefulJournal } from '../redux/actions';

const Journal = ({ currentCalendarDateState, isExistingJournal, addDetailsToStatefulJournal, statefulJournal }) => {
	let history = useHistory();
	const [currentDate, setCurrentDate] = useState({
		day: '',
		month: '',
		date: '',
		year: '',
	});
	const [journalData, setJournalData] = useState('')
	const [editorData, setEditorData] = useState('')

	useEffect(() => {
		if (currentCalendarDateState) {
			const displayDate = new Date(currentCalendarDateState).toLocaleDateString("en-US", DATE_OPTIONS).split(',');
			const [month, date] = displayDate[1].trim().split(' ')
			setCurrentDate({
				...currentDate,
				day: displayDate[0].trim(),
				month: month.trim(),
				date: date.trim(),
				year: displayDate[2].trim()
			})
			if(isExistingJournal) {
				(async () => {
					try {
						let response = await getJournalDataForDate(currentCalendarDateState)
						setJournalData(response)
					} catch (error) {
						console.log(error)
					}
				})()
			} else {
				if(statefulJournal) {
					setJournalData(statefulJournal)
					setEditorData(statefulJournal)
				} else {
					setJournalData('')
				}
			}
		} else {
			history.push(ROUTES.LISTJOURNALS)
		}
	}, [currentCalendarDateState])
	const onChangeEditorData = data => {
		setEditorData(data)
		if(!isExistingJournal) {
			addDetailsToStatefulJournal(data)
		}
	}
	const handleCancel = () => {
		setCurrentCalendarDateState(null)
		addDetailsToStatefulJournal(null)
		history.push(ROUTES.LISTJOURNALS)
	}
	const handleSave = async () => {
		try {
			console.log(editorData)
			let response = await saveJournalData(currentCalendarDateState, editorData)
			if(response.isSaved) {
				setCurrentCalendarDateState(null)
				addDetailsToStatefulJournal(null)
				history.push(ROUTES.LISTJOURNALS)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<div className="container">
				<div className="row mt-5 mb-2">
					<div className="col-12 col-md-5 pl-4 pr-4">
						<CalendarButton 
							currentDate={currentDate} 
							timeStamp={currentCalendarDateState}
							/>
					</div>
					<div className="col-12 col-md-4 offset-md-3">
						<div className="container-fluid">
							<hr className="d-sm-none d-block" />
							<div className="row">
								<div className="col-6">
									<button className="btn btn-block btn-primary" onClick={() => { handleSave() }}>
										Save
									</button>
								</div>
								<div className="col-6">
									<button className="btn btn-block btn-danger" onClick={() => { handleCancel() }}>
										Discard
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<RichEditor setEditorData={onChangeEditorData} editorContentValue={journalData} />
					</div>
				</div>
			</div>

		</>
	)
}
const mapStateToProps = state => {
	return {
		currentCalendarDateState: state.currentCalendarDateState,
		isExistingJournal: state.isExistingJournal,
		statefulJournal: state.statefulJournal,
	}
}
const mapDispatchToProps = dispatch => {
	return {
		addDetailsToStatefulJournal: journalData => {
			dispatch(addDetailsToStatefulJournal(journalData))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Journal);