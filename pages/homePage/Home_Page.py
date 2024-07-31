from flask import Blueprint, render_template, session

Home_Page_bp = Blueprint(
    'homePage',
    __name__,
    static_folder='static',
    static_url_path='/homePage/static',
    template_folder='templates'
)

@Home_Page_bp.route('/')
def Home_Page():
    if session.get('logged_in'):
        first_name = session.get('firstName')
    else:
        first_name = None
    return render_template('Home_Page.html', first_name=first_name)
