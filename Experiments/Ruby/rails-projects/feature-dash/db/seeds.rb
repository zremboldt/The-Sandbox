# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


features = [
  { name: "Skip report ordering", description: "When enabled, organic traffic in specified markets will be bucketed to skip prefill report ordering." },
  { name: "SkipPhone", description: "When enabled, bucketed users will not be asked to provide their phone number." }
]

features.each do |feature_params|
  Feature.create!(feature_params)
end

# Create conditions and associate them with features
conditions = [
  { name: "Markets", conditions: "WI, IA, ME, AZ", feature: Feature.find_by(name: "Skip report ordering") }
]

conditions.each do |condition_params|
  Condition.create!(condition_params)
end

# Create enableds and associate them with features
enabled = [
  { name: "Enabled", is_enabled: true, feature: Feature.find_by(name: "Skip report ordering") },
  { name: "Enabled", is_enabled: false, feature: Feature.find_by(name: "SkipPhone") }
]

enabled.each do |enabled_params|
  Enabled.create!(enabled_params)
end