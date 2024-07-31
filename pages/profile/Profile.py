from flask import Blueprint, render_template, session, redirect, url_for

from db_connector import find_one_user

Profile_bp = Blueprint(
    'profile',
    __name__,
    static_folder='static',
    static_url_path='/profile/static',
    template_folder='templates'
)


@Profile_bp.route('/profile')
def Profile_Page():
    if not session.get('logged_in'):
        return redirect(url_for('signIn.Sign_In_Page'))

    email = session.get('email')
    user = find_one_user(email)

    if user:
        return render_template('Profile_Page.html', user=user)
    else:
        # Handle the case where user is not found
        return redirect(url_for('signIn.Sign_In_Page'))