import React, { useState, useEffect } from 'react';
import JournalsForADay from './JournalsForADay'
import { getAllJournals } from '../api/api'
import { DATE_OPTIONS, JOURNALS } from '../resources/constants'

const ListJournals = () => {
	const [journals, setJournals] = useState({})

	useEffect(() => {
		(async () => {
			try {
				let res = await getAllJournals();
				setJournals(res)
			} catch (err) {
				console.log(err)
			}
		})()
	}, [])

	const renderList = () => {
		let dates = [];
		for (var date in journals) {
			dates.push(date)
		}
		dates.sort().reverse();
		return dates.map((date, index) => {
			//[DAY, "MONTH DATE", YEAR]
			const displayDate = new Date(date).toLocaleDateString("en-US", DATE_OPTIONS).split(',');
			const [month, number] = displayDate[1].trim().split(' ')
			return (
				<div className="container-fluid" key={index}>
					<div className="row pl-3 pr-3 pt-5">
						<div className="col-8 col-md-2">
							<h4 className="mb-0">
								<b><span className="text-highlight">{month.toUpperCase()}</span>{' ' + number}</b>
							</h4>
							<p className="text-muted">
								{displayDate[0].trim().toUpperCase()}
							</p>
						</div>
						<div className="col-4 col-md-1">
							<h4 className="text-muted">
								{displayDate[2].trim()}
							</h4>
						</div>
					</div>
					<JournalsForADay journals={journals[date]} />
				</div>
			)
		})
	}

	return (
		<>
			<div className="container-fluid">
				<div className="row mt-3">
					<div className="col-sm-12 text-center">
						<br />
						<h3 className="text-center"><b>{JOURNALS}</b></h3>
						<hr />
					</div>
				</div>
			</div>
			{renderList()}
		</>
	)
}

export default ListJournals;