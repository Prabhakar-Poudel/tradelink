class SlotBooking
  def initialize(slot_params)
    @slot = Slot.new(slot_params)
  end

  def call
    date = @slot.starts_at
    duration = (@slot.ends_at - @slot.starts_at) / 1.minutes
    slot_overlap_service = SlotOverlap.new(date, duration)
    available = slot_overlap_service.call(@slot)
    return false unless available
    @slot.save!
  end

  private

  def all_slots
    (@date.beginning_of_day.to_i...@date.end_of_day.to_i)
      .step(15.minutes)
      .map do |slot|
        start = Time.at(slot)
        Slot.new(starts_at: start, ends_at: start + @duration)
      end
  end
end
