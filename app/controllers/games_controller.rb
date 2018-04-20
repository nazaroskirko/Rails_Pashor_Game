class GamesController < ApplicationController
  before_action :set_game, only: [:show, :edit, :update, :destroy]

  # GET /games
  # GET /games.json
  def index
    @games = Game.all
  end

  # GET /games/1
  # GET /games/1.json
  def show
  end

  # GET /games/new
  def new
    @game = Game.new
  end

  # GET /games/1/edit
  def edit
  end

  # POST /games
  # POST /games.json
  def create
    @game = Game.new(game_params)
    rank = Game.where(params[:game][:total_points] > params[:game][:total_points]).count
      if @game.save
        render json: {rank: rank, gameID: @game.id}.to_json
      else
        render json: 'game did not save'
      end
  end

  # PATCH/PUT /games/1
  # PATCH/PUT /games/1.json
  def update
    respond_to do |format|
      if @game.update(game_params)
        format.html { redirect_to @game, notice: 'Game was successfully updated.' }
        format.json { render :show, status: :ok, location: @game }
      else
        format.html { render :edit }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1
  # DELETE /games/1.json
  def destroy
    @game.destroy
    respond_to do |format|
      format.html { redirect_to games_url, notice: 'Game was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_rankings
    @sorted_players = Player.limit(100).all
    @sorted_players = @sorted_players.sort_by(&:score).reverse!
    render :json => @sorted_players[0..9]
  end

  def set_rank
    @game = params[:game]
    @game_entry = Game.create! :version_id => 1, :total_points => @game[:total_points], :total_time => @game[:total_time]
    @sorted_players = Player.limit(100).all
    @sorted_players = @sorted_players.sort_by(&:score).reverse!
    @sorted_players.each_with_index do |user, index|
      if(@game[:total_points].to_i > user.score)
        @index = index + 1
        puts @index
        break
      end
    end
    render json: {rank: @index, gameID: @game_entry.id}.to_json
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def game_params
      params.require(:game).permit(:total_time, :version_id, :total_points)
    end
end
