i = 0

loop do
  x = rand(1..30)
  
  case
  when x == 1
    puts "🔥"
  when (10..20).include?(x)
    puts i
  else
    puts x
  end
  
  i = i + 1
  
  if i == 20 
    break
  end
end