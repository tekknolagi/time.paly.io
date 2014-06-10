require 'time_diff'

def hours_difference punch_in, punch_out
  return 0 if punch_out == nil

  diff = Time.diff(punch_out, punch_in)

  # you can't just "if 0" in Ruby because everything except false and nil are truthy
  if (diff[:year] + diff[:month] + diff[:week] + diff[:day]) != 0
    0
  else
    diff[:hour] + diff[:minute]/60.0 + diff[:second]/3600.0
  end
end
