Rails.application.routes.draw do
  root 'slots#index'

  get '/available_slots', to: 'slots#get_available_slots'
  post '/book_slot', to: 'slots#book_slot'
end
