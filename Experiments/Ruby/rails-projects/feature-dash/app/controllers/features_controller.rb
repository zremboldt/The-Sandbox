class FeaturesController < ApplicationController

  # def index
  #   @categories = Category.order(:name)
  # end

  # def show
  #   @category = Category.find(params[:id])
  # end

  # def new
  #   @category = Category.new
  # end

  # def create
  #   @category = Category.new(category_params)
  #   if @category.save
  #     redirect_to(categories_path)
  #   else
  #     render('new')
  #   end
  # end

  # def edit
  #   @category = Category.find(params[:id])
  #   @tasks = Task.all
  # end

  # def update
  #   @category = Category.find(params[:id])

  #   puts "IT IS UPDATING!"
  #   puts "------------------------"
  #   puts params
  #   puts "------------------------"

  #   if @category.update(category_params)
  #     redirect_to(categories_path)
  #   else
  #     render('edit')
  #   end
  # end

  # def delete
  #   @category = Category.find(params[:id])
  # end

  # def destroy
  #   @category = Category.find(params[:id])
  #   @category.destroy
  #   redirect_to(categories_path)
  # end

  private

  # def feature_params
  #   params.require(:feature).permit(:name, :tasks)
  # end

end
