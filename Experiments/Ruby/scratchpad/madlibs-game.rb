#!/usr/bin/env ruby

prompts = {
  'START' => 'Give me',
  'VERB' => 'a verb (action word)',
  'CREATURE' => 'a creature',
  'ADJECTIVE' => 'an adjective (descriptive word)',
  'NOUN' => 'a noun (an object)'
}

sentenceStarters = [
  "The ADJECTIVE dog VERB down the street",
  "The ADJECTIVE cat VERB up the NOUN",
  "The ADJECTIVE bird VERB a ADJECTIVE song",
  "The ADJECTIVE CREATURE VERB in the park",
  "The ADJECTIVE CREATURE VERB through the NOUN",
  "The ADJECTIVE horse VERB across the NOUN",
  "The ADJECTIVE CREATURE stared at the NOUN",
  "The ADJECTIVE frog VERB into the NOUN",
  "The ADJECTIVE rabbit VERB a carrot with a ADJECTIVE crunch",
]

random_sentence = sentenceStarters[rand(sentenceStarters.length)]

# ===============================================================
# ===============================================================

puts
puts "--------------------"
puts "| Ruby Blanks Game |"
puts "--------------------"
puts

finalSentence = random_sentence.split(' ').map do |word|
  prompts.each do |wordType|
    if wordType[0] == word
      puts "Give me #{wordType[1]}"
      print "> "
      word = gets.chomp.upcase
    end
  end

  word
end

puts 
puts '---------------------------------'
puts 
puts finalSentence.join(' ') << '.'
