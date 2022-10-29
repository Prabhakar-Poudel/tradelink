import React, { useState } from 'react'
import { Layout, message } from 'antd'
import { getAvailableSlots, bookSlot } from './request'
import SlotForm from './SlotForm'
import SlotSelect from './SlotSelect'

const Slot = () => {
	const [availableSlots, setAvailableSlots] = useState([])
	const [noResult, setNoResult] = useState(false)

	const onFormSubmit = (value) => {
		setNoResult(false)
		getAvailableSlots(value.date.toISOString(true), value.duration).then(
			(slots) => {
				setAvailableSlots(slots)
				if (!slots.length) setNoResult(true)
			}
		)
	}

	const onSlotSelect = (selectdSlot) => {
		bookSlot(selectdSlot)
			.then(() => {
				message.success('Your booking is complete')
				setAvailableSlots([])
			})
			.catch((error) => {
				if (error.code === 'ERR_BAD_REQUEST') {
					message.error('Oops! Slot is taken. Please try again')
				} else {
					message.error('Something went wrong. Please try again')
				}
			})
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Layout.Header>FindMeATime</Layout.Header>
			<Layout.Content style={{ width: '80vw', margin: '50px auto' }}>
				<SlotForm onSubmit={onFormSubmit} loading={false} />
				{availableSlots.length > 0 && (
					<SlotSelect slots={availableSlots} onSelect={onSlotSelect} />
				)}
				{noResult && <div>No Slots available for the selected date</div>}
			</Layout.Content>
		</Layout>
	)
}

export default Slot
