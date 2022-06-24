#!/usr/bin/env ruby

# Different ways to short circuit a script
# Each behaves a bit differently
# break
# exit
# abort()

fruits = ["lemon", "lime", "pineapple", "orange", "grape", "apple", "bananna", "cherry", "kiwi"]

fruits.each do |fruit|
  if fruit == "apple"
    # break
    # exit
    # abort()

    abort("Apple found! Apples aren't allowed!")
  end

  puts "- #{fruit.capitalize}"
end

puts "Total fruit: #{fruits.count}"