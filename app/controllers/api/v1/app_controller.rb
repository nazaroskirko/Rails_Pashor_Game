class Api::V1::AppController < Api::V1::ApiController
  layout "gamelayout"

  def main
    @val = 2
    render 'app'
  end 

  def images
    render :file => 'public/api/v1/item_images/images.json',
           :content_type => 'application/json',
           :layout => false
  end 
end