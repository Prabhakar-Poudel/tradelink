import React from 'react'
import { Card } from 'antd'
import moment from 'moment'

const SlotSelect = ({ slots, onSelect }) => {
	return (
		<Card title="Select a time" style={{ marginTop: 16, overflowY: 'auto' }}>
			{slots.map((slot) => {
				const time = moment(slot.starts_at).format('HH:mm')
				return (
					<Card.Grid
						key={time}
						style={{
							width: '25%',
							textAlign: 'center',
							cursor: 'pointer',
							fontSize: 24,
							padding: 8,
							color: 'blue  '
						}}
						onClick={() => onSelect(slot)}
					>
						{time}
					</Card.Grid>
				)
			})}
		</Card>
	)
}

export default SlotSelect
