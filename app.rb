require 'grape'
require './db'
require './patches'
require 'awesome_print'

class TimeApp < Grape::API
  format :json

  get '/' do
    { :hello => :world }
  end

  get '/punch/:name' do
    name = params[:name].downcase

    user = User.first :name => name
    lastday = user.days.last

    if !lastday || lastday.pout
      Day.create :user => user, :pin => DateTime.now
    else
      lastday.update! :pout => DateTime.now
    end

    user.reload
    user.with_attributes :status, :total_hours
   end

  post '/postreceive' do
    `git pull origin master`
    `bundle install`
    `sleep 5`
    `./scripts/restart.sh`
  end
end
