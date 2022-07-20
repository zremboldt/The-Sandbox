class CategoriesController < ApplicationController
  def index
  end

  def show
    @category = Category.find(params[:id])
    @tasks = Task.where(category_id: @category)
    @completed_tasks = completed_tasks
    @total_tasks = total_tasks
    @percent_complete = percent_complete
  end

  def new
    @category = Category.new
  end
  
  def create
    @category = Category.new(category_params)
    if @category.save
      redirect_to "/"
    else
      render("new")
    end
  end

  def edit
  end

  def update
  end

  def delete
    @category = Category.find(params[:id])
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    redirect_to "/"
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

  def percent_complete
    return 0 if total_tasks == 0
    (100 * completed_tasks.to_f / total_tasks).round(1)
  end

  def completed_tasks
    @completed_tasks ||= @tasks.where(completed: true).count
  end

  def total_tasks
    @total_tasks ||= @tasks.count
  end

  def status
    case percent_complete.to_i
    when 0
      'Not started'
    when 100
      'Complete'
    else
      'In progress'
    end
  end
end
