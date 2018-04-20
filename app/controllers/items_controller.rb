class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  # GET /items?level=1
  # GET /items.json
  def index
    level = params[:level]
    @items = Item.all
    respond_to do |format|
      format.html { render :index}
      format.json {render json: @items}
    end
  end

  # GET /items/1
  # GET /items/1.json
  def show
  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(item_params)
      if @item.save
        redirect_to "/admin/manage-items"
      else
        format.html { render :new }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
  end

  # PATCH/PUT /items/1
  # PATCH/PUT /items/1.json
  def update
      if @item.update(item_params)
        redirect_to "/admin/manage-items"
      else
        format.html { render :edit }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item.destroy
    respond_to do |format|
      format.html { redirect_to items_url, notice: 'Item was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  # GET /items/level?=1
  # Return 5 items per level
  def level
    level = params[:id]
    numItems = params[:number]
    # Don't try to return more than 10 items (performance)
    if numItems.to_i > 10 || numItems.to_i <  1
      render json: {error: "Max 10 Items, Min 5 items", status: 403}.to_json
      return
    end
    # Load items by level and limit to request < 10
    puts "Level: #{level}, numItems: #{numItems}"
    @items = Item.where(level_id: level).limit(numItems);
    # Ensure enough items exists
    if @items.empty?
      render json: {error: "No items available", status: 400}.to_json
      return
      # Everything is checked, return array of items
    end
    render json: @items.to_json
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def item_params
      params.fetch(:item, {}).permit(:image_url, :name, :description, :incorrect_message, :bin_id, :level_id)
    end

end
