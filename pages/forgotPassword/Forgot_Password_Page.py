from flask import Blueprint, render_template, request, url_for, redirect
from db_connector import check_security_question

Forgot_Password_bp = Blueprint(
    'forgotPassword',
    __name__,
    static_folder='static',
    static_url_path='/forgotPassword/static',
    template_folder='templates'
)

@Forgot_Password_bp.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    print("Forgot password route accessed")  # Debug print
    if request.method == 'POST':
        print("POST request received")  # Debug print
        email = request.form['email']
        security_answer = request.form['securityQuestion']
        print(f"Email: {email}, Security Answer: {security_answer}")  # Debug print

        if check_security_question(email, security_answer):
            print("Security question verified")  # Debug print
            return redirect(url_for('passwordReset.password_reset', token=email))
        else:
            print("Security question failed")  # Debug print
            error_message = "Invalid email or security question answer."
            return render_template('Forgot_Password_Page.html', error_message=error_message)

    print("GET request, rendering form")  # Debug print
    return render_template('Forgot_Password_Page.html')