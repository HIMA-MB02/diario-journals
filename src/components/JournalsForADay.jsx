import React from 'react';
import { formatAMPM, getLinesFromBlock } from '../resources/common'
import { setCurrentCalendarDateState, setIsExistingJournal } from '../redux/actions'
import { connect } from 'react-redux'
import { ROUTES } from '../resources/constants'
import { useHistory } from 'react-router-dom'

const JournalsForADay = ({ journals, setCurrentCalendarDateState, setIsExistingJournal }) => {
	let history = useHistory();
	const displayJournal = timeStamp => {
		setCurrentCalendarDateState(timeStamp);
		setIsExistingJournal(true);
		history.push(ROUTES.JOURNAL);
	}
	return journals.map((journal, index) => {
		let time = formatAMPM(journal.timeStamp);
		return (
			<>
				<div key={index} className={`row p-3 mb-1 journal ${index ? null : `hr-border`}`} onClick={() => displayJournal(journal.timeStamp)}>
					<div className="col-12">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-2 col-12 m-auto">
									<p className="lead text-highlight"><b>{time}</b></p>
								</div>
								<div className="col-md-10 col-12">
									<p className="lead truncate-heading">
										{getLinesFromBlock(journal.body)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	})
}

const mapDispatchToProps = dispatch => {
	return {
		setCurrentCalendarDateState: timeStamp => {
			dispatch(setCurrentCalendarDateState(timeStamp))
		},
		setIsExistingJournal: isExisting => {
			dispatch(setIsExistingJournal(isExisting))
		}
	}
}
export default connect(null, mapDispatchToProps)(JournalsForADay);