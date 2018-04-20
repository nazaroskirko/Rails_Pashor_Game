class AdminController < ApplicationController
before_action :authenticate_user!

  def dashboard
    @numGames = Game.all.count # Game.all.count
    @numTime = Response.sum(:time_taken)/60 # Response.sum(:time_taken)/60
    today = Date.today #last_week.ago?
    @newUsers = Player.where(created_at: Date.today.beginning_of_week..Date.today.end_of_week).count #Player.where(created_at > today
    @avgTime = Response.average(:time_taken) # Response.average(:time_taken)

    @bin_1_incorrect = Response.where(bin_id: 1, correct: false).count;
    @bin_2_incorrect = Response.where(bin_id: 2, correct: false).count;
    @bin_3_incorrect = Response.where(bin_id: 3, correct: false).count;
    @bin_4_incorrect = Response.where(bin_id: 4, correct: false).count;
    bin_index = [@bin_1_incorrect, @bin_2_incorrect, @bin_3_incorrect, @bin_4_incorrect].each_with_index.max[1];
    @numIncorrectBinName = Bin.find(bin_index).name
    if Response.where(correct: false, attempt: 0).exists?
      @overallCorrectPercentage = (Response.where(correct: true, attempt: 0).count.to_f / Response.where(correct: true).where(["attempt > ?", 0]).count).to_f*100;
    else
      @overallCorrectPercentage = 0;
    end
    @averageScore = Game.average(:total_points)
    render 'dashboard'
  end

  def manage_items
    @items = Item.all
    render 'manage_items'
  end

end
