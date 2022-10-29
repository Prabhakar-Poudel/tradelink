import React from 'react'
import { Button, Card, DatePicker, Form, InputNumber } from 'antd'
import moment from 'moment'

const today = moment().startOf('day')
const hundredDaysFromToday = moment().add(100, 'days').startOf('day')

const disabledDate = (current) => {
	return current && (current < today || current > hundredDaysFromToday)
}

const SlotForm = ({ onSubmit, loading }) => {
	return (
		<Card hoverable style={{ margin: 'auto', borderRadius: 16 }}>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onSubmit}
				autoComplete="off"
			>
				<Form.Item
					label="Date"
					name="date"
					rules={[
						{
							required: true,
							message: 'Please select the date!'
						}
					]}
				>
					<DatePicker style={{ width: 180 }} disabledDate={disabledDate} />
				</Form.Item>

				<Form.Item
					label="Duration"
					name="duration"
					rules={[
						{
							required: true,
							message: 'Please specify the duration!'
						}
					]}
				>
					<InputNumber min={10} max={180} step={5} style={{ width: 180 }} />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						style={{ width: 180 }}
					>
						Get availabilities
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}

export default SlotForm
