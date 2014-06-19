require 'data_mapper'
require 'dm-postgres-adapter'
require './helpers'

username = ENV['TIME_USERNAME']
password = ENV['TIME_PASSWORD']
host = ENV['TIME_HOST']
database = ENV['TIME_DATABASE']
string = "postgres://#{username}:#{password}@#{host}/#{database}"

DataMapper.setup :default, string

class Day
  include DataMapper::Resource

  property :id, Serial
  property :pin, DateTime
  property :pout, DateTime

  belongs_to :user

  def day
    pin.strftime('%b %d')
  end

  def time_worked
    hours_difference pin, pout
  end

  def would_have_worked ppout
    hours_difference pin, ppout
  end
end

class User
  include DataMapper::Resource

  property :id, Serial
  property :name, String
  property :pass, BCryptHash, :lazy => true
  property :full_name, String

  has n, :days

  def table_days
    days.map do |day|
      {
        # Month DayOfMonth
        :date => day.pin.strftime('%b %d'),
        # Hour:Minute pm
        :pin => day.pin.strftime('%l:%M%P'),
        # Hour:Minute pm
        :pout => day.pout != nil ? day.pout.strftime('%l:%M%P') : '' ,
        :hours => day.time_worked.round(2)
      }
    end
  end

  def total_days
    days.count
  end

  def total_hours
    days.map(&:time_worked).inject(:+)
  end

  def avg_hours_per_day
    # total_hours guaranteed to be float
    total_hours/total_days
  end

  def status
    return :in if days.last.pout == nil
    :out
  end

  def punch test_pass
    return false if pass != test_pass

    lastday = days.last

    if lastday == nil || lastday.pout
      Day.create :user => self, :pin => DateTime.now
      # check if checkin time is >= half an hour
    elsif lastday.would_have_worked(DateTime.now) >= 0.5
      lastday.update! :pout => DateTime.now
    else
      lastday.destroy!
    end
  end

  # necessary to overwrite, then call with custom arguments
  alias :oldjson :to_json

  def to_json
    oldjson :exclude => [ :pass ]
  end
end

DataMapper.auto_upgrade!
