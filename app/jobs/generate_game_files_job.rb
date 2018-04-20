require 'json'
class GenerateGameFilesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    puts "worker running"
    @images = {}
    all_items  = Item.all
    all_items.each do |item|
      @images[item.name]  = item.name
      item.attributes.each_pair do |name, value|
        @images[item.name]  = item.value
      end
    end 
    File.open("public/api/v1/item_images/images.json","w") do |f|
      f.write(JSON.pretty_generate(@images))
    end
  end
end
