class Bin < ApplicationRecord
  has_many :items

  #1 = Recycling
  #2 = Garbage
  #3 = Food
  #4 = Paper
end
