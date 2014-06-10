require './app'

# This is messy. Ideally going to /api would mean nginx forwards user to / in the application.
run Rack::URLMap.new({
  '/api' => TimeApp.new
})
