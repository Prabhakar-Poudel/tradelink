class SlotFinder
  def initialize(date, duration)
    @date = Time.parse(date)
    @duration = duration.minutes
  end

  def call
    slot_overlap_service = SlotOverlap.new(@date, @duration)
    all_slots.select { |slot| slot_overlap_service.call(slot) }
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
