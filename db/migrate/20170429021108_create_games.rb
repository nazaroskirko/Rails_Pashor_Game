class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.integer :total_time
      t.references :version, foreign_key: true
      t.integer :total_points

      t.timestamps
    end
  end
end
