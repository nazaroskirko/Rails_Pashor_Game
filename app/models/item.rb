require 'json'
class Item < ApplicationRecord
  attr_reader :garbage
  has_many :responses, dependent: :destroy
  belongs_to :bin
  belongs_to :level
  mount_uploader :image_url, ImageUploader
  after_save :store_image_url!, :reload_game_files

# Virtual fields to calculate counts in each bin
  def garbage
    correct_bin = self.bin_id
    Item.find(self.id).responses.where(bin_id: 1).count
  end

  def recycle
    correct_bin = self.bin_id
    Item.find(self.id).responses.where(bin_id: 2).count
  end

  def food_scraps
    correct_bin = self.bin_id
    Item.find(self.id).responses.where(bin_id: 3).count
  end
  def paper
    correct_bin = self.bin_id
    Item.find(self.id).responses.where(bin_id: 4).count
  end

  def reload_game_files
    puts "Reloading files..."
    GameFileManager.perform_async
  end

end
