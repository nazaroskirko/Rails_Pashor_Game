class AddLevelToItems < ActiveRecord::Migration[5.0]
  def change
    add_reference :items, :level, foreign_key: true
  end
end
