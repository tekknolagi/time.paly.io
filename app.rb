require 'grape'

class TimeApp < Grape::API
  format :json

  get '/' do
    { :hello => :world }
  end

  get '/punch/:name' do
    { :name => params[:name] }
  end

  post '/postreceive' do
    `git pull origin master`
    `bundle install`
    `sleep 5`
    `./scripts/restart.sh`
  end
end
