class Feature < ApplicationRecord
  has_one :enabled, dependent: :destroy
  has_one :condition, dependent: :destroy
  accepts_nested_attributes_for :enabled, :condition

  validates :name, presence: true, uniqueness: true
end