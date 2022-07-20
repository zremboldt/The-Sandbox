class MainController < ApplicationController
  def index
    @categories = Category.all
  end

  def about
    @author = "Zac"
    @coming_from = params[:coming_from]
    @user_id = params[:user_id]
  end

  def hello
    redirect_to(action: 'index')
  end
end
