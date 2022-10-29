class SlotOverlap
  def initialize(date, duration)
    @date = date
    @duration = duration
  end

  def call(slot)
    no_overlaps?(Slot.new(starts_at: slot.starts_at, ends_at: slot.ends_at))
  end

  private

  def no_overlaps?(slot)
    # start between the booked - 3..6, 1..4 # case 1
    # end between the booked - 3..6, 4..7 # case 2
    # start and end between the booked - 3..6, 2..7 # case 1/2
    # start and end covers booked - 3..6, 4..5 # case 3
    # both same - 3..6, 3..6
    already_booked_slots.all? do |booked_slot|
      booked_slot.starts_at > slot.ends_at || booked_slot.ends_at < slot.starts_at
    end
  end

  def already_booked_slots
    return @already_booked_slots if @already_booked_slots

    start_time = @date.beginning_of_day
    #  say a booked slot starts at 1 AM tomorrow
    #  And we want 2 hours slot today
    #  slots after 11 PM should be unavailable
    #  If ther were no such booking we return a slot that spans 2 days but starts today
    end_time = start_time + 1.day + @duration
    # get anything that either start or end in the time range we are interested in
    @already_booked_slots = Slot.where('(starts_at >= ? AND starts_at < ?) OR (ends_at > ? AND ends_at < ?)', start_time, end_time, start_time, end_time)
  end
end
