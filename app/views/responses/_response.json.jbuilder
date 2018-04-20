json.extract! response, :id, :item_id, :game_id, :bin_id, :correct, :time_taken, :created_at, :updated_at
json.url response_url(response, format: :json)