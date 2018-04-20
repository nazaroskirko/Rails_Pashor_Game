class GameFileManager 
  include Sidekiq::Worker
  sidekiq_options retry: false

  #removing all signature data off the s3 url
  def sanatize_url(url)
    uri = URI.parse(url);
    cleaned_url = "https://" + uri.host + uri.path
  end 

  def perform
    puts "File writing.." 
    @images = {}
    all_items  = Item.all
    all_items.each do |item|
      unless item.image_url.url == nil
        cleaned_url = sanatize_url(item.image_url.url) 
        @images[item.name]  = cleaned_url
      end 
    end 
    File.open("public/api/v1/item_images/images.json","w") do |f|
      f.write(JSON.pretty_generate(@images))
    end
    puts "File writing completed!!"
  end 
end 