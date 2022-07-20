class TasksController < ApplicationController
  def index
    @page = params[:page].to_i
    @tasks = Task.order(:position)
  end
  
  def show
    @task = Task.find(params[:id])
  end

  def new
    @count = Task.count
    @task = Task.new(position: @count + 1)
    @categories = Category.all
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      redirect_to tasks_path
    else
      # The new action is not being called here this is just rendering the new template
      render('new')
    end
  end

  def edit
    @task = Task.find(params[:id])
    @categories = Category.all
  end
  
  def update
    # @category = Category.find(params[:category_id])
    @task = Task.find(params[:id])
    if @task.update(task_params)
      redirect_to task_path(@task)
    else
      render('edit')
    end
  end

  def delete
    @task = Task.find(params[:id])
  end
  
  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    redirect_to tasks_path
  end

  private

  def task_params
    params.require(:task).permit(
      :name, 
      :position, 
      :category_id,
      :completed, 
      :description
    )
  end
end
