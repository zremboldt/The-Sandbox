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

    # TODO: This is a hack to get around the fact that the buckets are not being passed in correctly from the form
    updated_buckets = permit_params[:feature][:bucket_attributes][:buckets].first.to_h.map { |key, value| { key => value } }
    ba = { bucket_attributes: { buckets: updated_buckets } }
    merged_params = permit_params[:feature].merge(ba)

    if @feature.update(merged_params)
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
      bucket_attributes: [:id, :name, buckets: [{}]],
    )
  end

  # Temporary
  def permit_params
    params.permit!
  end
end
