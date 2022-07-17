Rails.application.routes.draw do
  match "/", to: "main#index", via: :get

  match "about", to: "main#about", via: :get
  match "hello", to: "main#hello", via: :get

  resources :tasks do
    member do
      get :delete
    end
  end
  
  resources :categories do
    member do
      get :delete
    end
  end


  # get 'categories/index'
  # get 'categories/show'
  # get 'categories/new'
  # get 'categories/edit'
  # get 'categories/delete'

  # get 'tasks/index'
  # get 'tasks/new'
  # get 'tasks/edit'
  # get 'tasks/show'
  # get 'tasks/delete'
  
  # get 'main/index'
  # match "main", to: "main#index", via: :get
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
