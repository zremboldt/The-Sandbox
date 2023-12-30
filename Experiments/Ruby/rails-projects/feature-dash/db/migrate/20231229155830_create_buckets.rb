class CreateBuckets < ActiveRecord::Migration[7.0]
  def change
    create_table :buckets do |t|
      t.string :name
      t.string :buckets
      t.references :feature, foreign_key: true

      t.timestamps
    end
  end
end
