class Bucket < ApplicationRecord
  include ActiveModel::Serializers::JSON

  belongs_to :feature
  
  # Getter method to deserialize the JSON string to an object as it comes out of the database
  def buckets
    value = read_attribute(:buckets)
    if value.present?
      p '--- getter value ↓ ---'
      p value
      p JSON.parse(value, symbolize_names: true) if value.is_a?(String)
      p '--- getter value ↑ ---'
      value = JSON.parse(value, symbolize_names: true) if value.is_a?(String)
    else
      []
    end
  end
  
  # Setter method to serialize the object to a JSON string before it goes into the database
  def buckets=(value)
    p '--- setter value ↓ ---'
    p value
    p value.to_json
    p '--- setter value ↑ ---'
    write_attribute(:buckets, value.to_json)
  end
end
