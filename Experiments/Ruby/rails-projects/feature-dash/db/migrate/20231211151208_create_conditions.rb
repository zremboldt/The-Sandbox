class CreateConditions < ActiveRecord::Migration[7.0]
  def change
    create_table :conditions do |t|
      t.string :display_name
      t.string :name
      t.string :conditions

      t.timestamps
    end
  end
end
