require 'redis'
# Configuration
redis = Hash.new{|h, k| h[k] = Hash.new(url: ENV["REDISTOGO_URL"].presence || "redis://localhost:6379")}

redis["production"] = {url: ENV["REDISTOGO_URL"].presence || "redis://localhost:6390"}
# redis["staging"] = {url: ENV["REDISTOGO_URL"].presence || "redis://localhost:6390"}
redis["development"] = {url: "redis://localhost:6390"}
redis["test"] = {url: "redis://localhost:6391"}

# Parse the env-specific url
if Rails.env.production?
  url = ENV["REDISTOGO_URL"]
end
if Rails.env.development? || Rails.env.test?
  url = "redis://localhost:6390"
end 
# Boot local redis in dev
if Rails.env.development? || Rails.env.test?
  system("redis-server --port #{url} --daemonize yes")
  raise "Couldn't start redis" if $?.exitstatus != 0
end

# Initialize application-wide constant.
REDIS = Redis.new(url: url)
puts ">> Initialized REDIS with #{REDIS.inspect}"