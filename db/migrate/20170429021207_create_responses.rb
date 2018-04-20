class CreateResponses < ActiveRecord::Migration[5.0]
  def change
    create_table :responses do |t|
      t.references :item, foreign_key: true
      t.references :game, foreign_key: true
      t.references :bin, foreign_key: true
      t.boolean :correct
      t.integer :time_taken

      t.timestamps
    end
  end
end
