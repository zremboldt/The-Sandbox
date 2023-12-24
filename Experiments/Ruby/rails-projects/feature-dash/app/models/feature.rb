class Feature < ApplicationRecord
  has_one :enabled, dependent: :destroy
  has_one :condition, dependent: :destroy

  validates :display_name, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true
end
