from flask import Blueprint, render_template, request, jsonify
from db_connector import reset_user_password

Password_Reset_bp = Blueprint(
    'passwordReset',
    __name__,
    static_folder='static',
    static_url_path='/passwordReset/static',
    template_folder='templates'
)


@Password_Reset_bp.route('/password-reset/<token>', methods=['GET', 'POST'])
def password_reset(token):
    if request.method == 'POST':
        new_password = request.form['newPassword']

        # Validate the password (you can add more complex validation if needed)
        if len(new_password) < 8 or not any(char.isdigit() for char in new_password):
            return jsonify({"success": False,
                            "message": "Password must be at least 8 characters long and contain at least one number."}), 400

        # Reset the password in the database
        success, message = reset_user_password(token, new_password)

        if success:
            return jsonify({"success": True, "message": "Password has been reset successfully!"}), 200
        else:
            return jsonify({"success": False, "message": message}), 400

    # For GET requests, render the password reset page
    return render_template('Password_Reset_Page.html', token=token)