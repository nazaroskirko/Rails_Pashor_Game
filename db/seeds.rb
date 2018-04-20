# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Admin users
if(!User.exists?(1))
  user1 = User.create! :email => 'srinjoy12@gmail.com', :password => '123456', :password_confirmation => '123456'
end
#Bins
garbage = Bin.create! :name => "Garbage", :description => "All garbage related items", :disposal_type => 2
recycle = Bin.create! :name => "recycle", :description => "All recyle related items", :disposal_type => 1
food_scraps = Bin.create! :name => "food scraps", :description => "All food related items", :disposal_type => 3
paper = Bin.create! :name => "paper", :description => "All paper related items", :disposal_type => 4

#Versions
version1 = Version.create! :name => "UBC Nest"

level1 = Level.create! :version_id => version1.id, :difficulty => 1
level2 = Level.create! :version_id => version1.id, :difficulty => 2
level3 = Level.create! :version_id => version1.id, :difficulty => 3

p1 = Player.create! :email => "srinjoy@live.ca", :score => 225, :name => "Billy Jones"
p1 = Player.create! :email => "kate@live.ca", :score => 220, :name => "Kate Winslow"
p1 = Player.create! :email => "sjon@live.ca", :score => 190, :name => "John Doe"
