require 'grape'

class TimeApp < Grape::API
  format :json

  get '/' do
    { :hello => :world }
  end

  post '/postreceive' do
    `git pull origin master`
    `bundle install`
    `sleep 5`
    `./scripts/restart.sh`
  end
end
