from flask import Blueprint, render_template

Contact_Methods_bp = Blueprint(
    'contactMethods',
    __name__,
    static_folder='static',
    static_url_path='/contactMethods/static',
    template_folder='templates'
)

@Contact_Methods_bp.route('/contact')
def contact_page():
    return render_template('Contact_Methods.html')
