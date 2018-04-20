class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :image_url
      t.string :name
      t.string :description
      t.string :incorrect_message
      t.timestamps
    end
  end
end
