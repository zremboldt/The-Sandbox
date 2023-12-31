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

    p '--- params ↓ ---'
    p params
    p '--- params ↑ ---'

    p '--- feature_params ↓ ---'
    p feature_params
    p '--- feature_params ↑ ---'

    # return





    updated_buckets = params[:feature][:bucket_attributes][:buckets].map do |bucket|
      bucket.transform_keys(&:to_sym)
    end


    p '--- updated_buckets ↓ ---'
    p updated_buckets
    p '--- updated_buckets ↑ ---'


    if @feature.update(bucket_attributes: { buckets: updated_buckets })
    # if @feature.update(params)
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
      bucket_attributes: [:id, :name, buckets: [:permit!]],
      # bucket_attributes: [:id, :name, buckets: [:key, :value, :id]],
      # bucket_attributes: [:id, :name, buckets: [:bucket => [:key, :value, :id]]]
      # bucket_attributes: [:id, :name, { buckets: [:key, :value, :id] }]
    )
  end
end
