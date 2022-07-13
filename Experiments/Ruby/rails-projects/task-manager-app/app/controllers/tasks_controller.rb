class TasksController < ApplicationController
  def index
    @todos = ["Paint the baseboards", "Mow the lawn", "Fix the basement floor drain", "Skimcoat the living room wall", "Clean out the dishwasher", "Keep learning Rails"]
  end

  def new
  end

  def edit
  end
end
