Rails.application.routes.draw do
  resources :responses
  resources :games
  resources :items  do
    collection do
      get 'level'
    end
  end
  resources :players
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/allresponses' => 'responses#batch_create'
  get '/rankings' => 'games#get_rankings'

  post '/rank' => 'games#set_rank'
  #App specific routes
  root 'pages#home'

  #Devise handle auth for all admin actions
  authenticate :user do
    scope '/admin' do
      mount RailsAdmin::Engine => '/ubcadmin', as: 'rails_admin'
      get '/dashboard' => 'admin#dashboard'
      get '/manage-items' => 'admin#manage_items'
    end
  end

  #Game specific routes
  namespace :api do
    namespace :v1 do
      get '/app' , to: 'app#main'
      get '/game_images', to: 'app#images'
    end
  end
end
