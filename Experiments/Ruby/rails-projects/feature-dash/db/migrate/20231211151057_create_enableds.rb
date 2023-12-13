class CreateEnableds < ActiveRecord::Migration[7.0]
  def change
    create_table :enableds do |t|
      t.string :display_name
      t.string :name
      t.boolean :enabled

      t.timestamps
    end
  end
end
