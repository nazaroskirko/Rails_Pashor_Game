RailsAdmin.config do |config|

  config.model 'Level' do
    visible false
  end

  config.model 'Bin' do
    visible false
  end

  config.model 'Version' do
    visible false
  end

  config.model 'Item' do
     exclude_fields :created_at, :updated_at, :responses
     field :garbage
     field :recycle
     field :paper
     field :food_scraps
  end

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end
