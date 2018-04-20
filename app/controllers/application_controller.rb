class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  layout :layout
  #Override default redirect to root from devise
  def after_sign_in_path_for(resource)
    rails_admin_path
  end

  def layout
    # only turn it off for login pages:
    is_a?(Devise::SessionsController) ? false : "application"
    # or turn layout off for every devise controller:
    !devise_controller? && "application"
  end
end
