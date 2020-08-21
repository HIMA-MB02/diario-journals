import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ROUTES, NAVIGATION_BUTTONS } from '../resources/constants';
import { useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { setIsExistingJournal, setCurrentCalendarDateState, setReturnToJournal } from '../redux/actions'

const FooterNavigation = ({ setCurrentCalendarDateState, setIsExistingJournal, setReturnToJournal }) => {
	let location = useLocation();
	let history = useHistory();
	const [display, setDisplay] = useState('d-block')
	const [active, setActive] = useState(location.pathname)
	useEffect(() => {
		if (location.pathname === ROUTES.JOURNAL) {
			setReturnToJournal(true);
		} else if(location.pathname === ROUTES.CALENDARSEARCH){
			setReturnToJournal(false);
		} 
		if(location.pathname === ROUTES.JOURNAL || location.pathname === ROUTES.CALENDAR || location.pathname === ROUTES.SELECT_TIME) {
			setDisplay('d-none')
		} else {
			setDisplay('d-block')
		}
	}, [location.pathname])
	const displayNewJournal = () => {
		setCurrentCalendarDateState(new Date());
		setIsExistingJournal(false);
		history.push(ROUTES.JOURNAL);
		setActive(ROUTES.JOURNAL)
	}
	const displayCalendarSearch = () => {
		setCurrentCalendarDateState(new Date());
		history.push(ROUTES.CALENDARSEARCH);
		setActive(ROUTES.CALENDARSEARCH)

	}
	const displayJournalsList = () => {
		history.push(ROUTES.LISTJOURNALS);
		setActive(ROUTES.LISTJOURNALS)
	}
	return (
		<div className={`container-fluid footer-navigation ${display}`}>
			<div className="row">
				<div className={`col-4 text-center p-3 router-link-button ${active === ROUTES.LISTJOURNALS? `router-link-button-active`: null}`} onClick={() => { displayJournalsList() }}>
					<i className="fa fa-list fa-lg"></i>
					<p className="mb-0">{NAVIGATION_BUTTONS.JOURNALS}</p>
				</div>
				<div className={`col-4 text-center p-3 router-link-button ${active === ROUTES.CALENDARSEARCH? `router-link-button-active`: null}`} onClick={() => { displayCalendarSearch() }}>
					<i className="fa fa-calendar fa-lg"></i>
					<p className="mb-0">{NAVIGATION_BUTTONS.CALENDAR}</p>
				</div>
				<div className={`col-4 text-center p-3 router-link-button ${active === ROUTES.JOURNAL? `router-link-button-active`: null}`} onClick={() => { displayNewJournal() }}>
					<i className="fa fa-plus-circle fa-lg"></i>
					<p className="mb-0">{NAVIGATION_BUTTONS.ADD_NEW}</p>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = dispatch => {
	return {
		setCurrentCalendarDateState: timeStamp => {
			dispatch(setCurrentCalendarDateState(timeStamp))
		},
		setIsExistingJournal: isExisting => {
			dispatch(setIsExistingJournal(isExisting))
		},
		setReturnToJournal: returnToJournal => {
			dispatch(setReturnToJournal(returnToJournal))
		}
	}
}
export default connect(null, mapDispatchToProps)(FooterNavigation)