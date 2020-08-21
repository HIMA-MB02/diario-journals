let errorMsg =  "Something went wrong! Please try again";

export const getAllJournals = () => {
	return new Promise((resolve, reject) => {
		let data = localStorage.getItem('applicationData');
		if(data) {
			resolve(JSON.parse(data))
		} else {
			reject(errorMsg)
		}
	})
}

//returns list of journals on a particular date
export const getJournalsForDate = forDate => {
	return new Promise((resolve, reject) => {
		let date = forDate.month + ' ' + forDate.date + ' ' + forDate.year;
		if (date.trim()) {
			let result = getJournalsForDateFromLocalStorage(date);
			if (result) {
				resolve(result)
			} else {
				resolve([])
			}
		} else {
			reject(errorMsg)
		}
	})
}

//returns journal data of a journal on a particular date
export const getJournalDataForDate = forDate => {
	return new Promise((resolve, reject) => {
		let journals = getJournalsForDateFromLocalStorage(forDate);
		if(journals) {
			let temp = journals.filter(journal => (journal.timeStamp === forDate));
			if(temp[0]) {
				resolve(temp[0].body);
			} else {
				reject(errorMsg)
			}
		} else {
			reject(errorMsg)
		}
	})
}

// Returns true if no journal is already present for the particular forDate
export const isDateTimeAvailable = forDate => {
	return new Promise((resolve, reject) => {
		const journals = getJournalsForDateFromLocalStorage(forDate);
		if(journals) {
			let results = journals.filter(journal => (journal.timeStamp == forDate))
			if(results.length <= 0) {
				resolve({
					isAvailable: true,
					message: 'No contradicting time found!'
				})
			} else {
				resolve({
					isAvailable: false,
					message: 'A journal already exists for the selected time! Please select a different time.'
				})
			}
		} else {
			resolve({
				isAvailable: true,
				message: 'No contradicting time found!'
			})
		}
		reject(errorMsg)
	})
}

//Saves a journal on a particualar date with body as journalData
export const saveJournalData = (forDate, journalData) => {
	return new Promise((resolve, reject) => {
		let journals = getJournalsForDateFromLocalStorage(forDate);
		if(journals) {
			let result = journals.filter(journal => (journal.timeStamp !== forDate))
			result.push({
				timeStamp: new Date(forDate).toString(),
				body: journalData
			})
			saveJournalDataToLocalStorage(forDate, result);
			resolve({
				isSaved: true,
				message: 'Journal saved!'
			})
		} else {
			let result = [{	
				timeStamp: new Date(forDate).toString(),
				body: journalData
			}]
			saveJournalDataToLocalStorage(forDate, result)
			resolve({
				isSaved: true,
				message: 'Journal saved!'
			})
		}
		reject(errorMsg)
	})
}

export const deleteJournal = forDate => {
	return new Promise((resolve, reject) => {
		console.log(forDate);
		deleteJournalFromLocalStorage(forDate);
		resolve({
			isDeleted: true,
			message: 'Deleted successful'
		})
	})
}

//Helper functions to interact with localStorage
const getJournalsForDateFromLocalStorage = forDate => {
	const [ldate, lmonth, lyear] = new Date(forDate).toLocaleString().slice(0, 10).split('/');
	let localStorageData = localStorage.getItem('applicationData');
	let applicationData = JSON.parse(localStorageData);
	return applicationData[`${lyear}-${lmonth}-${ldate}`];
}

const deleteJournalFromLocalStorage = forDate => {
	const [ldate, lmonth, lyear] = new Date(forDate).toLocaleString().slice(0, 10).split('/');
	let localStorageData = localStorage.getItem('applicationData');
	let applicationData = JSON.parse(localStorageData);
	let jouurnalsOnDate = applicationData[`${lyear}-${lmonth}-${ldate}`];
	let updatedJournals = jouurnalsOnDate.filter(journal => (journal.timeStamp !== forDate));
	if(updatedJournals.length <= 0) {
		delete applicationData[`${lyear}-${lmonth}-${ldate}`]
	} else {
		applicationData[`${lyear}-${lmonth}-${ldate}`] = updatedJournals;
	}
	localStorage.setItem('applicationData', JSON.stringify(applicationData))
}

const saveJournalDataToLocalStorage = (forDate, data) => {
	data.sort(function(a, b) {
		let dateA = new Date(a.timeStamp);
		let dateB = new Date(b.timeStamp);
		return dateB - dateA;
	});
	const [ldate, lmonth, lyear] = new Date(forDate).toLocaleString().slice(0, 10).split('/');
	let localStorageData = localStorage.getItem('applicationData');
	let applicationData = JSON.parse(localStorageData);
	applicationData[`${lyear}-${lmonth}-${ldate}`] = data;
	localStorage.setItem('applicationData', JSON.stringify(applicationData))
}