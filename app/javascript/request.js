import axios from 'axios'

export const getAvailableSlots = (date, duration) => {
	return axios
		.get('/available_slots', {
			params: { options: { date, duration } }
		})
		.then(({ data }) => data)
}

export const bookSlot = ({ starts_at, ends_at }) => {
	return axios
		.post('/book_slot', { slot: { starts_at, ends_at } })
		.then(({ data }) => data)
}
