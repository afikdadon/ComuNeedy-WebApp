#My_Requests.py
from flask import Blueprint, render_template, session, redirect, url_for
from db_connector import fetch_user_requests
import json
import logging

My_Requests_bp = Blueprint(
    'myRequests',
    __name__,
    static_folder='static',
    static_url_path='/myRequests/static',
    template_folder='templates'
)

@My_Requests_bp.route('/requests')
def my_requests():
    logging.info("Entering my_requests route")
    if not session.get('logged_in'):
        logging.info("User not logged in, redirecting to sign in page")
        return redirect(url_for('signIn.Sign_In_Page'))

    email = session.get('email')
    logging.info(f"Fetching requests for email: {email}")
    requests = fetch_user_requests(email)
    logging.info(f"Fetched requests: {requests}")

    # Convert the list to a JSON string
    requests_json = json.dumps(requests)
    logging.info(f"Requests JSON: {requests_json}")

    return render_template('My_Requests.html', requests=requests_json)