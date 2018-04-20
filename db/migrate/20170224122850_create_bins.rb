class CreateBins < ActiveRecord::Migration[5.0]
  def change
    create_table :bins do |t|
      t.string :name
      t.string :description
      t.integer :disposal_type # 1 for garbage, 2 for recycle, etc.
      t.timestamps
    end
  end
end
