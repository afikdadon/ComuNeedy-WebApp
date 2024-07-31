from flask import Blueprint, render_template, jsonify
from db_connector import feedback_col

Volunteer_Profile_bp = Blueprint(
    'volunteerProfile',
    __name__,
    static_folder='static',
    static_url_path='/volunteerProfile/static',
    template_folder='templates'
)

@Volunteer_Profile_bp.route('/volunteer_profile')
def Volunteer_Profile_Page():
    return render_template('Volunteer_Profile_Page.html')

@Volunteer_Profile_bp.route('/api/reviews/<int:volunteer_id>')
def get_volunteer_reviews(volunteer_id):
    reviews = list(feedback_col.find({'volunteer_id': volunteer_id}, {'_id': 0, 'rating': 1, 'description': 1}))
    return jsonify(reviews)
