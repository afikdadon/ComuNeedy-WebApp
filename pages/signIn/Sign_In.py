from flask import Blueprint, render_template, request, session, redirect, url_for, flash
from db_connector import find_one_user

Sign_In_bp = Blueprint(
    'signIn',
    __name__,
    static_folder='static',
    static_url_path='/signIn/static',
    template_folder='templates'
)

@Sign_In_bp.route('/signin', methods=['GET', 'POST'])
def Sign_In_Page():
    if request.method == 'POST':
        if 'email' in request.form:
            email = request.form['email']
            password = request.form['password']
            # Query the database for the user by email
            user = find_one_user(email)
            if user and user.get('password') == password:
                session['email'] = email
                session['firstName'] = user.get('firstName')
                session['logged_in'] = True
                print(f"Logged in as: {user['firstName']}")
                return redirect('/')
            else:
                print('Wrong email or password')
                flash('Invalid email or password, please try again.', 'error')
                return render_template('Sign_In_Page.html')

    # For a GET request, render the signIn page
    return render_template('Sign_In_Page.html')

@Sign_In_bp.route('/logout', methods=['GET'])
def logout():
    session.clear()  # Clear all session data
    return redirect(url_for('signIn.Sign_In_Page'))
