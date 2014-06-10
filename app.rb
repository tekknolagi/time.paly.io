require 'grape'
require './db'
require './patches'

class TimeApp < Grape::API
  format :json

  get '/' do
    { :hello => :world }
  end

  post :postreceive do
    `git pull origin master`
    `bundle install`
    `sleep 5`
    `./scripts/restart.sh`
  end

  params do
    requires :name, :type => String, :desc => 'Username of puncher.'
  end
  group do
    # needs to be inside otherwise it applies globally -.-
    before do
      @name = params[:name].downcase
      @user = User.first :name => @name

      if !@user
        error! 'User not found'
      end
    end

    get :days do
      @user.with_attributes(:days)
    end

    get :stats do
      @user.with_attributes(:status, :total_hours, :avg_hours_per_day)
    end

    get :punch do
      lastday = @user.days.last

      if lastday == nil || lastday.pout
        Day.create :user => @user, :pin => DateTime.now
      else
        lastday.update! :pout => DateTime.now
      end

      @user.reload
      @user.with_attributes :status, :total_hours
    end
  end
end
