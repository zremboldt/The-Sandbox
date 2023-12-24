class CreateFeatures < ActiveRecord::Migration[7.0]
  def change
    create_table :features do |t|
      t.string :display_name
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
