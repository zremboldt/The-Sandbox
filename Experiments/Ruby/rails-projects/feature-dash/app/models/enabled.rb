class Enabled < ApplicationRecord
  belongs_to :feature

  validates :display_name, presence: true
  validates :name, presence: true, uniqueness: true
end
