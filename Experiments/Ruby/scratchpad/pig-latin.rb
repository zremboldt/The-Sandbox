#!/usr/bin/env ruby


# Write a Ruby script which converts a single word into pig latin

# Pig Latin Rules
# For words beginning with one consonant, the consonant moves to the end, followed by "ay."
# "pig" => "igpay"
# "latin" => "atinlay"

# For words beginning with vowel sounds, just add "ay" to the end.
# "elevator" => "elevatoray"

# For words beginning with a consonant cluster, the whole cluster moves to the end, followed by "ay."
# "glove" => "oveglay"
# "where" => "erewhay"

# Tip: A consonant cluster is just all letters before the first vowel.


# -----------------------------------------------------------------


VOWELS = ['a', 'e', 'i', 'o', 'u']
ENDING = 'ay'

def word_to_pig_latin(word)
  word.downcase!
  
  # convert word to an array
  chars = word.split('')
  
  # find first vowel position
  firstVowelPos = chars.find_index {|char| VOWELS.include?(char)}

  if firstVowelPos && firstVowelPos > 0
    first_chars = chars.shift(firstVowelPos)
    chars_arranged = (chars + first_chars).join('')
    new_word = chars_arranged + ENDING
  else
    new_word = chars.join('') + ENDING
  end

  new_word
end



# puts word_to_pig_latin ("Ruby")
# ubyray
# puts word_to_pig_latin ("Mountain")
# Ountainmay
# puts word_to_pig_latin ("Equip")
# Equipay
# puts word_to_pig_latin ("Steadfast")
# Eadfaststay


# -----------------------------------------------------------------


def sentence_to_pig_latin(sentence)
  words = sentence.split(' ')

  pig_latin_words = words.map {|word| word_to_pig_latin(word)}

  pig_latin_words.join(' ').capitalize + '.'
end

# puts sentence_to_pig_latin('The quick spastic cat leaped over the sleeping manatee')
# Ethay Uickqay Asticspay Atcay Eapedlay Overay Ethay Eepingslay Anateemay.


# -----------------------------------------------------------------


puts
puts "-----------------------------------"
puts "| English to Pig Latin translator |"
puts "-----------------------------------"
puts

puts "(NOTE: punctuation not supported in v1)"
puts "Please enter a sentence you would like to have translated:"

print "> "
sentence = gets.chomp
puts
puts "Here's your sentance in Pig Latin:"
puts sentence_to_pig_latin(sentence)
