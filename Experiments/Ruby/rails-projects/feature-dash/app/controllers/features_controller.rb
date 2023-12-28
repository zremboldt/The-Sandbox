class FeaturesController < ApplicationController

  def index
    # @features = Feature.all
    @features = if params[:search].present?
      Feature.search(params[:search])
    else
      Feature.order(:name)
    end
  end

  # def show
  #   @feature = Category.find(params[:id])
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

  def edit
    @feature = Feature.find(params[:id])
  end

  def update
    @feature = Feature.find(params[:id])

    if @feature.update(feature_params)
      redirect_to(features_path)
    else
      render('edit')
    end
  end

  # def delete
  #   @category = Category.find(params[:id])
  # end

  # def destroy
  #   @category = Category.find(params[:id])
  #   @category.destroy
  #   redirect_to(categories_path)
  # end

  private

  def feature_params
    params.require(:feature).permit(
      :name,
      :description,
      enabled_attributes: [:id, :name, :is_enabled],
      condition_attributes: [:id, :name, :conditions],
    )
  end
end
