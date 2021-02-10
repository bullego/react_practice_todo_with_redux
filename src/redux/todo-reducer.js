import { getActualDeals,
				 updateDealStatus,
				 deleteCurrentDeal,
				 createDeal } from '../api/api.js';
import { todoDataSelector } from './todo-selectors.js';

export const DEAL_LIST_RECEIVED = 'TODO/DEAL_LIST_RECEIVED';

const initialState  = {
	todoData: []
}

//Reducer
const dealsReducer = (state = initialState, action) => {
	switch(action.type) {
		case DEAL_LIST_RECEIVED:
			return {
				...state,
				todoData: action.dealList
			};
		default:
			return state;
	}
}
export default dealsReducer;


//Action Creator
export const dealListReceivedAC = (dealList) => {
	return {
		type: DEAL_LIST_RECEIVED,
		dealList
	}
}

//Thunk Creator
export const getDealListTC = () => async (dispatch) => {
	try {
		const dealList = await getActualDeals();
		dispatch(dealListReceivedAC(dealList));
	}
	catch(error) {
		alert(`Get deal list ${error}`)
	}
};


export const updateDealStatusTC = (dealId, propName) => async (dispatch, getState) => {
	try {
		const state = getState();
		const deals = todoDataSelector(state);

		const dealToChange = deals.find(deal => deal.id === dealId);

		const changedDeal = {
			...dealToChange,
			[propName]: !dealToChange[propName]
		}
		
		await updateDealStatus(changedDeal, dealId)
		dispatch(getDealListTC())
	}
	catch(error) {
		alert(`Update deal status (done/important) ${error}`)
	}
};


export const deleteDealTC = (dealId) => async (dispatch) => {
	try {
		await deleteCurrentDeal(dealId);
		dispatch(getDealListTC())
	}
	catch(error) {
		alert(`Delete deal ${error}`)
	}
};


export const createDealTC = (text) => async (dispatch) => {
	try {
		const newDeal = {
			dealName: text,
			important: false,
			done: false,
			createdAt: new Date().toISOString()
		}

		await createDeal(newDeal);
		dispatch(getDealListTC());
	}
	catch(error) {
		alert(`Create new deal ${error}`)
	}
}