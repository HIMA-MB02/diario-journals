import React, { useEffect } from 'react';
import './App.css';
import { Navbar, ListJournals, FooterNavigation, CalendarSearch, ReactCalendar, Journal, ReactTimePicker } from './components'
import { ROUTES } from './resources/constants'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { testData } from './resources/constants'

function App() {
	useEffect(() => {
		if(!localStorage.getItem('applicationData')) {
			localStorage.setItem('applicationData', JSON.stringify(testData))
		}
	}, [])
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path={ROUTES.HOME} component={ListJournals} />
					<Route exact path={ROUTES.LISTJOURNALS} component={ListJournals} />
					<Route exact path={ROUTES.CALENDARSEARCH} component={CalendarSearch} />
					<Route exact path={ROUTES.CALENDAR} component={ReactCalendar} />
					<Route exact path={ROUTES.JOURNAL} component={Journal} />
					<Route exact path={ROUTES.SELECT_TIME} component={ReactTimePicker} />
				</Switch>
				<div className="p-5"></div>
				<FooterNavigation />
			</div>
		</Router>
	);
}

export default App;
