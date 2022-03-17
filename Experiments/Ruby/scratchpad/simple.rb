class Human
  def initialize(first_name, middle_name, last_name, age)
    @first_name = first_name
    @middle_name = middle_name
    @last_name = last_name
    @age = age
  end

  def simple_print
    puts "#{@first_name} #{@middle_name} #{@last_name}"
  end

  def complex_print
    puts "First name: #{@first_name}"
    puts "Middle name: #{@middle_name}"
    puts "Last name: #{@last_name}"
    puts "Age: #{@age}"
  end
end

human1 = Human.new("John", "Paul", "Jones", "30")
human2 = Human.new("Danny", "Paul", "King", "30")

puts human1.simple_print
puts human2.complex_print