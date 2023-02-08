class AccessController < ApplicationController

  before_action :confirm_logged_in, except: [:new, :create]

  # display menu
  def menu
    # render('menu') # default behavior of the menu method. This just makes it explicit.
    # render(plain: 'Just render some plain text')
    # render(html: '<p>Render some html</p>')
    # render(json: Task.first) # This is good for creating an API. Providing a json response from some of your routes.
    # render(xml: ['cat', 'dog', 'turtle'])
    # render(plain: 'OK', status: 200)
    # path_to_404 = Rails.root.join('public', '404.html')
    # render(file: path_to_404)
    # send_file(path_to_404)
    # string = render_to_string(file: path_to_404)
    # logger.debug(string)
  end

  # display login form
  def new
    if logged_in?
      redirect_to(menu_path)
    end
  end

  # processs login form
  def create
    logger.info("***** Login user #{params[:username]}")

    # do login process here
    cookies[:username] = params[:username]
    session[:user_id] = 1483
    flash[:notice] = "Login successful!"
    redirect_to(menu_path)
  end

  # logout user
  def destroy
    logger.info("***** Logout user #{cookies[:username]}")

    # do logout process here
    cookies[:username] = nil
    session[:user_id] = nil
    flash[:notice] = "Logged out"
    redirect_to(login_path)
  end
end
