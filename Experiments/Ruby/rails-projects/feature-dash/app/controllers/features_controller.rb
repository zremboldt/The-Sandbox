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

    if @feature.update(permit_params[:feature])
      redirect_to(features_path)
    else
      render('edit')
    end
  end

  private

  # TODO: Can't get bucket_attributes working
  def feature_params
    params.require(:feature).permit(
      :name,
      :description,
      enabled_attributes: [:id, :name, :is_enabled],
      condition_attributes: [:id, :name, :conditions],
      buckets_attributes: [:id, :name, :value]
    )
  end

  # Temporary
  def permit_params
    params.permit!
  end
end
