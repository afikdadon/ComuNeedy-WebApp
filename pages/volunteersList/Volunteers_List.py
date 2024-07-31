from flask import Blueprint, render_template, jsonify
from db_connector import volunteers_col
from bson import json_util

Volunteers_List_bp = Blueprint(
    'volunteersList',
    __name__,
    static_folder='static',
    static_url_path='/volunteersList/static',
    template_folder='templates'
)

Volunteers_List_bp = Blueprint(
    'volunteersList',
    __name__,
    static_folder='static',
    static_url_path='/volunteersList/static',
    template_folder='templates'
)


@Volunteers_List_bp.route('/volunteers')
def Volunteers_List_Page():
    # Fetch all volunteers from the collection
    volunteers = list(volunteers_col.find({}, {
        '_id': 0,
        'volunteerID': 1,
        'firstName': 1,
        'lastName': 1,
        'gender': 1,
        'birthDate': 1,
        'languages': 1,
        'typeOfService': 1,
        'serviceArea': 1,
        'averageRating': 1,
        'totalReviews': 1
    }))

    # Convert the list to a JSON string
    volunteers_json = json_util.dumps(volunteers)

    return render_template('Volunteers_List.html', volunteers=volunteers_json)