i = 0

loop do
  x = rand(1..2)
  
  if x == 1
    puts "x"
  else x == 2
    puts "o"
  end
  
  i = i + 1
  
  if i == 10 
    break
  end
end