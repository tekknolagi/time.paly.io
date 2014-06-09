require 'grape'

class TimeApp < Grape::API
  format :json

  get '/' do
    { :hello => :world }
  end
end
