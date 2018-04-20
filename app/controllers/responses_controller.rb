class ResponsesController < ApplicationController
  before_action :set_response, only: [:show, :edit, :update, :destroy]

  # GET /responses
  # GET /responses.json
  def index
    @responses = Response.all
  end

  # GET /responses/1
  # GET /responses/1.json
  def show
  end

  # GET /responses/new
  def new
    @response = Response.new
  end

  # GET /responses/1/edit
  def edit
  end

  # POST /responses
  # POST /responses.json
  def create
    @response = Response.new(response_params)

    respond_to do |format|
      if @response.save
        format.html { redirect_to @response, notice: 'Response was successfully created.' }
        format.json { render :show, status: :created, location: @response }
      else
        format.html { render :new }
        format.json { render json: @response.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /responses/1
  # PATCH/PUT /responses/1.json
  def update
    respond_to do |format|
      if @response.update(response_params)
        format.html { redirect_to @response, notice: 'Response was successfully updated.' }
        format.json { render :show, status: :ok, location: @response }
      else
        format.html { render :edit }
        format.json { render json: @response.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /responses/1
  # DELETE /responses/1.json
  def destroy
    @response.destroy
    respond_to do |format|
      format.html { redirect_to responses_url, notice: 'Response was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def batch_create
    @responses = params[:responses]
    @game_id = params[:game_id]
    @incorrect_formatted_items = []
    @responses.each do |response|
      if response[:correct] == false
        puts 'false'
        item = Item.find(response[:item_id]);
        @incorrect_formatted_items.push({item_name: item.name, message: item.incorrect_message}.to_json);
      end
      Response.create! ({game_id: @game_id,item_id: response[:item_id], bin_id: response[:bin_id], correct: response[:correct], time_taken: response[:time_taken], attempt: response[:attempt]})
    end
    render json: @incorrect_formatted_items
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_response
      @response = Response.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def response_params
      params.require(:response).permit(:item_id, :game_id, :bin_id, :correct, :time_taken)
    end

    def batch_response_params
      params.require(:response).permit(:item_id, :game_id, :bin_id, :correct, :time_taken)
    end
end
