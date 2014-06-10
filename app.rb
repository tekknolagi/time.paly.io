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
    end

    get :days do
      if @user
        @user.with_attributes(:days)
      else
        { :error => 'User not found.' }
      end
    end

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
end
