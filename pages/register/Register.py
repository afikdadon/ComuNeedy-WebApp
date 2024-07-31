from flask import Blueprint, request, render_template, jsonify
from db_connector import add_new_user

Register_bp = Blueprint(
    'register',
    __name__,
    static_folder='static',
    static_url_path='/register/static',
    template_folder='templates'
)

@Register_bp.route('/register', methods=['GET', 'POST'])
def Register_Page():
    if request.method == 'POST':
        # Get form data
        email = request.form['email']
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        phoneNumber = request.form['phoneNumber']
        securityQuestion = request.form['securityQuestion']
        password = request.form['password']
        confirmPassword = request.form.get('confirmPassword')

        # Server-side validation (basic checks)
        if not all([email, firstName, lastName, phoneNumber, securityQuestion, password]):
            return jsonify({"success": False, "message": "All fields are required"}), 400
        if password != confirmPassword:
            return jsonify({"success": False, "message": "Passwords do not match"}), 400

        # Add new user to the database
        success, message = add_new_user(email, firstName, lastName, phoneNumber, securityQuestion, password)
        return jsonify({"success": success, "message": message})

    return render_template('Register_Page.html')