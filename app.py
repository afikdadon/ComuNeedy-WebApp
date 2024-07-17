from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home_page():
    return render_template('Home Page.html')

@app.route('/contact')
def contact_page():
    return render_template('Contact Methods.html')

@app.route('/requests')
def my_requests():
    return render_template('My Requests.html')

@app.route('/request_details')
def request_details():
    request_id = request.args.get('id')
    if request_id:
        return render_template('Request Details.html', request_id=request_id)
    else:
        return "Request ID not provided", 400

# @app.route('/service_request')
# def service_request():
#     return render_template('Service Request Page.html')

@app.route('/service_request')
def service_request():
    volunteer_name = request.args.get('volunteer')
    request_id = request.args.get('request_id')
    return render_template('Service Request Page.html', volunteer=volunteer_name, request_id=request_id)

@app.route('/forgot-password')
def forgot_password():
    return render_template('Forgot Password Page.html')

@app.route('/password-reset')
def password_reset():
    return render_template('Password Reset Page.html')

@app.route('/volunteers')
def volunteers_list():
    return render_template('Volunteers List.html')

@app.route('/volunteer_profile')
def volunteer_profile():
    return render_template('Volunteer Profile Page.html')

@app.route('/new-request')
def new_request():
    return render_template('New Request Page.html')

@app.route('/register')
def register_page():
    return render_template('Register Page.html')

@app.route('/signin')
def sign_in():
    return render_template('Sign In Page.html')

@app.route('/profile')
def profile_page():
    return render_template('Profile Page.html')

@app.route('/profile/edit')
def profile_edit_page():
    return render_template('Profile Editing Page.html')


if __name__ == '__main__':
    app.run(debug=True)