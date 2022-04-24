row_count = 10
column_count = row_count * 2.4

patterns = [
  ['┼', '┼', ' '],
  ['✦', '✧', ' '],
  ['✕', '+', ' '],
  ['∶', '∷', ' '],
  ['⋅', '=', '='],
  ['┆', '┆', '⋅'],
  ['╮', '┼', '╰'],
  ['⏐', '┆', '⏐'],
  ['≠', '≎', '≑'],
  ['⋅', '╲', '╱'],
  ['╲', '╱', '╳'],
  ['╲', '╲', '╱'],
  ['╳', '╳', '╳'],
  ['╲', '╲', '╲'],
]

randomPattern = patterns[rand(patterns.length())]

row_count.times do
  arr = []
  
  while arr.length < column_count
    random_num = rand(0..2)
    arr.push(randomPattern[random_num])
  end
  
  puts arr.join('')
end