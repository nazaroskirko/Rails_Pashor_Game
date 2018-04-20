redis_url = ENV['REDISTOGO_URL']
config_hash = {url: redis_url}

Sidekiq.configure_server do |config|
  config.redis = { url: ENV["REDISTOGO_URL"].presence || "redis://localhost:6379"}
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV["REDISTOGO_URL"].presence || "redis://localhost:6379"}
end