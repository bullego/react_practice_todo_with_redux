const baseUrl = 'https://601d2affbe5f340017a193db.mockapi.io/api/v1/deals';

export const createDeal = async (newDeal) => {
	const response = await fetch(baseUrl, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(newDeal)
	});
	if (!response.ok) {
		throw new Error('Failed to add deal');
	}
}


export const getActualDeals = async () => {
	const response = await fetch(baseUrl);
	if (!response.ok) {
		throw new Error('Failed to get deals');
	} else {
		return await response.json();
	}
}


export const updateDealStatus = async (changedDeal, dealId) => {
	const response = await fetch(`${baseUrl}/${dealId}`, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(changedDeal)
	})

	if(!response.ok) {
		throw new Error('Failed to change deal property');
	}
}


export const deleteCurrentDeal = async (dealId) => {		
	const response = await fetch(`${baseUrl}/${dealId}`, {
		method: 'DELETE'
	})
	
	if(!response.ok) {
		throw new Error('Failed to delete deal');
	}
};