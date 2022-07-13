Rails.application.routes.draw do
  match "/", to: "main#index", via: :get

  get 'tasks/index'
  get 'tasks/new'
  get 'tasks/edit'

  match "about", to: "main#about", via: :get
  match "hello", to: "main#hello", via: :get
  
  # get 'main/index'
  # match "main", to: "main#index", via: :get
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
