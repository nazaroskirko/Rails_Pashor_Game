class AddVersionToLevel < ActiveRecord::Migration[5.0]
  def change
    add_reference :levels, :version, foreign_key: true
  end
end
