#!/usr/bin/env ruby

p (1..10).find_all {|n| n % 3 == 0}

p (1..10).any? {|n| n % 3 > 6}

# Delete if multiple of 3
p [*1..10].delete_if {|n| n % 3 == 0 }

# Even Numbers
p [*1..10].delete_if {|n| n % 2 == 1 }

# inject and reduce are the same method in Ruby.
p [*1..5].inject {|memo, n| memo + n }

# Find the longest fruit name
fruits = ['apple', 'pineapple', 'pear', 'bananna', 'orange']

longestFruitName = fruits.inject do |memo, fruit|
  if fruit.length > memo.length
    fruit
  else
    memo
  end
end

p longestFruitName

puts '----------------------------------'

# Optional Arguments

def welcome(greeting, options={})
  name = options[:name] || 'friend'
  punct = options[:punct] || '!'
  "#{greeting} #{name}#{punct}"
end

puts welcome('Yo', {:name => 'bro'})

puts '----------------------------------'

# Multiple Assignment (called array destructuring in JS)

myArray = [1,2,3]
a, b, c = myArray
puts a
puts b
puts c