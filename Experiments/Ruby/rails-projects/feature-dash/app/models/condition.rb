class Condition < ApplicationRecord
  # Look here for serialization on this one: https://guides.rubyonrails.org/active_model_basics.html#serialization
  
  belongs_to :feature
end
