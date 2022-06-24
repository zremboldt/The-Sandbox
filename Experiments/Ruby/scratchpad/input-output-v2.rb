#!/usr/bin/env ruby

profile = {}

# Input

print "What's your name? "
profile[:name] = gets.chomp

print "What's your favorite sport? "
profile[:sport] = gets.chomp

print "What have you been learning lately? "
profile[:learning] = gets.chomp

# Output

puts "Hey, #{profile[:name]}!"

if profile[:sport] == "Disk Golf" || profile[:sport] == "Soccer"
  puts "I love #{profile[:sport]} too!"
end

puts "#{profile[:learning]} sounds interesting."