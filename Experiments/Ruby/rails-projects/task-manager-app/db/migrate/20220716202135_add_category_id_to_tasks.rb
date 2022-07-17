class AddCategoryIdToTasks < ActiveRecord::Migration[7.0]
  def change
    # We want to add a column to the tasks table called category_id.
    # It will be an integer column. 
    # And because it'll be a foreign key we're going to add an index to it so that we can lookup values quickly on it.
    add_column(:tasks, :category_id, :integer, index: true)
  end
end
