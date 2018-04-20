class AddBinToItems < ActiveRecord::Migration[5.0]
  def change
    add_reference :items, :bin, foreign_key: true
  end
end
