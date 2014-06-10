require './app'

run Rack::URLMap.new {
  '/api' => TimeApp.new
}
