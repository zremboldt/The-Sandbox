row_count = 10
column_count = row_count * 2.5

patterns = {
  # p0: ['⋅', '=', '='],
  p1: ['╲', '╲', '╳'],
  # p2: ['┆', '┆', '⋅'],
  # p3: ['┆', '⋅', ''],
  p4: ['⋅', '╲', '╱'],
  # p5: ['╮', '┼', '╰'],
  # p6: ['┼', '┼', ' '],
  # p7: ['⏐', '┆', '⏐'],
  # p8: ['✦', '✧', ''],
  # p9: ['✕', '+', ' '],
  # p10: ['≠', '≎', '≑'],
  # p11: ['∶', '', '∴'],
  # x: ['╳', '╳', '╳'],
  diagonal_maze: ['╲', '╲', '╱'],
  # diagonals: ['╲', '╲', '╲'],
  emojis: ['🪲 ', '🐞 ', ' '],
}

randomPattern = patterns.values[rand(patterns.values.length)]

selectedPattern = randomPattern
# selectedPattern = patterns[:p11]

i = 0
loop do
  arr = []
  
  loop do
    random_num = rand(1..4)
    
    case random_num
    when 1
      arr.push(selectedPattern[0])
    when 2
      arr.push(selectedPattern[1])
    when 3
      arr.push(selectedPattern[2])
    end

    if arr.length == column_count
      break
    end
  end
  
  puts arr.join('')
  
  i += 1
  if i == row_count
    break
  end
end