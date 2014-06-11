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
      days = @user.days
      mapped_days = days.map {|d|
        {
          :date => d.pin.strftime('%b %d'),
          :pin => d.pin.strftime('%l:%M%P'),
          :pout => d.pout.strftime('%l:%M%P'),
          :hours => d.time_worked.round(2)
        }
      }

      @user.attributes.merge :days => mapped_days
    end

    get :stats do
      h = @user.with_attributes(:status, :total_hours, :avg_hours_per_day)
      h[:total_hours] = h[:total_hours].round(2)
      h[:avg_hours_per_day] = h[:avg_hours_per_day].round(2)
      h
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
