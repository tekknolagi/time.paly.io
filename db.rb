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
end

class User
  include DataMapper::Resource

  property :id, Serial
  property :name, String

  has n, :days

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
end

DataMapper.auto_upgrade!