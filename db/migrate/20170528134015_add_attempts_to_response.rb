class AddAttemptsToResponse < ActiveRecord::Migration[5.0]
  def change
    add_column :responses, :attempt, :integer
  end
end
