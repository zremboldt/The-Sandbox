class Feature < ApplicationRecord
  has_one :enabled, dependent: :destroy
  has_one :condition, dependent: :destroy
  has_one :bucket, dependent: :destroy
  accepts_nested_attributes_for :enabled, :condition, :bucket

  validates :constant, presence: true, uniqueness: true

  def self.search(query)
    if query
      where('name LIKE ? OR constant LIKE ?', "%#{query}%", "%#{query}%")
    else
      all
    end
  end
end
