row_count = 20
column_count = row_count * 2.5

i = 0
loop do
  arr = []
  loop do
    random_num = rand(1..4)
    
    case random_num
    when 1
      # arr.push('╳')
      arr.push('╱')
      # arr.push('╲')
      # arr.push('╮')
    when 2
      # arr.push('┆')
      arr.push('╲')
      # arr.push('╭')
    when 3
      arr.push('╲')
      # arr.push('┌')
      # arr.push('╯')
      # arr.push('⋅')
      # arr.push('╌')
      # arr.push('')
      # arr.push('╳')
    when 4
      # arr.push('╰')
      # arr.push('┼')
      # arr.push('⋅')
      # arr.push('')
      # arr.push('⋅')
    end

    if arr.length == column_count
      break
    end
  end
  
  puts arr.join('')
  
  i = i + 1
  if i == row_count
    break
  end
end