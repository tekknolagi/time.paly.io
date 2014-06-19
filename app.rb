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
      puts params
      @name = params[:name].downcase
      @user = User.first :name => @name

      if !@user
        error! 'User not found'
      end
    end

    get :days do
      @user.with_attributes(:table_days).attribute_replace(:table_days, :days)
    end

    get :stats do
      h = @user.with_attributes(:status, :total_hours, :avg_hours_per_day)
      h[:total_hours] = h[:total_hours].round(2)
      h[:avg_hours_per_day] = h[:avg_hours_per_day].round(2)
      h
    end

    params do
      requires :pass, :type => String, :desc => 'User password.'
    end
    get :punch do
      res = @user.punch params[:pass]
      return { :error => 'Incorrect password.' } if not res

      @user.reload
      @user
    end
  end
end
