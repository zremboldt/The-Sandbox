class Feature < ApplicationRecord
  # has_one :description, dependent: :destroy
  has_one :enabled, dependent: :destroy
  has_many :conditions, dependent: :destroy

  validates :display_name, presence: true
  validates :name, presence: true, uniqueness: true
end
