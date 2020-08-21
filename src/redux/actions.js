import { ACTIONS } from '../resources/constants'

export const setCurrentCalendarDateState = timeStamp => {
	return {
		type: ACTIONS.ADD_CURRENT_CALENDAR_STATE,
		payload: timeStamp,
	}
}

export const setIsExistingJournal = isExisting => {
	return {
		type: ACTIONS.ADD_IS_EXISTING_JOURNAL,
		payload: isExisting
	}
}

export const setReturnToJournal = returnToJournal => {
	return {
		type: ACTIONS.ADD_RETURN_TO_JOURNAL,
		payload:  returnToJournal
	}
}

export const addDetailsToStatefulJournal = journalData => {
	return {
		type: ACTIONS.ADD_DETAILS_TO_STATEFUL_JOURNAL,
		payload: journalData
	}
}