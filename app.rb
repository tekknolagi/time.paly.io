require 'grape'
require './db'
require './patches'
require 'awesome_print'

class TimeApp < Grape::API
  format :json

  get '/' do
    { :hello => :world }
  end

  params do
    requires :name, :type => String, :desc => 'Username of puncher.'
  end
  before do
    @name = params[:name].downcase
    @user = User.first :name => @name
  end
  group do
    get :stats do
      if @user
        @user.with_attributes(:status, :total_hours, :avg_hours_per_day)
      else
        { :error => 'User not found.' }
      end
    end

    get :punch do
      if @user
        lastday = @user.days.last

        if !lastday || lastday.pout
          Day.create :user => @user, :pin => DateTime.now
        else
          lastday.update! :pout => DateTime.now
        end

        @user.reload
        @user.with_attributes :status, :total_hours
      else
        { :error => 'User not found.' }
      end
    end
  end

  post '/postreceive' do
    `git pull origin master`
    `bundle install`
    `sleep 5`
    `./scripts/restart.sh`
  end
end
