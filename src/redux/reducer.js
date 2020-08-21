import { ACTIONS } from '../resources/constants'

export const initialState = {
	currentCalendarDateState: null,
	isExistingJournal: false,
	returnToJournal: null,
	statefulJournal: null,
}

const rootReducer = (prevState = initialState, action) => {
	switch(action.type) {
		case ACTIONS.ADD_CURRENT_CALENDAR_STATE: 
			return {
				...prevState,
				currentCalendarDateState: action.payload
			}
		case ACTIONS.ADD_IS_EXISTING_JOURNAL:
			return {
				...prevState,
				isExistingJournal: action.payload
			}
		case ACTIONS.ADD_RETURN_TO_JOURNAL:
			return {
				...prevState,
				returnToJournal: action.payload
			}
		case ACTIONS.ADD_DETAILS_TO_STATEFUL_JOURNAL:
			return  {
				...prevState,
				statefulJournal: action.payload,
			}
		default:
			return {...prevState}
	}
}
export default rootReducer;