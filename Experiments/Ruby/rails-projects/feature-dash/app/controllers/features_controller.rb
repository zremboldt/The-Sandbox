class FeaturesController < ApplicationController

  def index
    # @features = Feature.all
    @features = if params[:search].present?
      Feature.search(params[:search])
    else
      Feature.order(:name)
    end
  end

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
