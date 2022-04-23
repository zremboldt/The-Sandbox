
i = 0

loop do
  x = rand(1..30)
  
  if x <= 10
    puts "x is less than or equal to 10"
  elsif x >= 20
    puts "x is greater than or equal to 20"
  else
    puts "x is between 10 and 20"
  end
  
  i = i + 1
  
  if i == 10 
    break
  end
end