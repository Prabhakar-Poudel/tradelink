class SlotsController < ApplicationController
  def index
  end

  def get_available_slots
    options = available_slots_options
    slots = SlotFinder.new(options['date'], options['duration'].to_i).call
    render json: slots
  end

  def book_slot
    puts booking_params
    booking = SlotBooking.new(booking_params).call
    if booking
      render json: booking
    else
      render json: {}, status: :conflict
    end
  end

  private

  def available_slots_options
    params.require(:options).permit(:date, :duration)
  end

  def booking_params
    params.require(:slot).permit(:starts_at, :ends_at)
  end
end
