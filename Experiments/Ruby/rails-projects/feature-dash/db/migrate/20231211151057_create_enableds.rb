class CreateEnableds < ActiveRecord::Migration[7.0]
  def change
    create_table :enableds do |t|
      t.string :name
      t.boolean :is_enabled
      t.references :feature, foreign_key: true

      t.timestamps
    end
  end
end
