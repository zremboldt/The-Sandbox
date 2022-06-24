#!/usr/bin/env ruby

MAX_NUMBER = 100
GUESS_COUNT = 5
random_number = rand(MAX_NUMBER) + 1

puts
puts "----------------------"
puts "| Ruby Guessing Game |"
puts "----------------------"
puts

puts "What's your name?"
print "> "
name = gets.chomp
puts

puts "Hey #{name} 👋"
puts "Let's play a game!"
puts "I'll think of a number between 1 and #{MAX_NUMBER} and you'll try to guess it."
puts "You get #{GUESS_COUNT} guesses."
puts
puts "----------------------"

GUESS_COUNT.times do |i|
  print "> "
  guess = gets.to_i
  
  case
  when guess == random_number
    puts "Wow, you guessed it!"
    puts "The number was #{random_number}. Nice work!"
    exit
  when guess < random_number
    puts "The number is higher than #{guess}."
  when guess > random_number
    puts "Whoops, #{guess} is too high."
  end
end

puts "----------------------"
puts
puts "Sorry #{name}, that was your last guess."
puts "The number was #{random_number}."
puts "Better luck next time!"