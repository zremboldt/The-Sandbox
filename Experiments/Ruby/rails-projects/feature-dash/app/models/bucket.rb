class Bucket < ApplicationRecord
  include ActiveModel::Serializers::JSON
  belongs_to :feature
  
  before_validation :transform_buckets_shape

  # This is a hack to get around the fact that the form isn't giving us the shape we want.
  # We're getting this: [{:BLOCKING_MODAL=>"30", :NON_BLOCKING_MODAL=>"70"}]
  # But we want this:   [{:BLOCKING_MODAL=>"30"}, {:NON_BLOCKING_MODAL=>"70"}]
  def transform_buckets_shape
    if self.buckets.length == 1
      self.buckets = self.buckets.first.map { |key, value| { key => value } }
    end
  end
  
  # Getter method to deserialize the JSON string to an object as it comes out of the database
  def buckets
    value = read_attribute(:buckets)
    if value.present?
      value = JSON.parse(value, symbolize_names: true) if value.is_a?(String)
    else
      []
    end
  end
  
  # Setter method to serialize the object to a JSON string before it goes into the database
  def buckets=(value)
    write_attribute(:buckets, value.to_json)
  end
end
