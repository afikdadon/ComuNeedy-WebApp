from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from db_connector import add_new_request, volunteers_col, statuses

New_Request_bp = Blueprint(
    'newRequest',
    __name__,
    static_folder='static',
    static_url_path='/newRequest/static',
    template_folder='templates'
)


@New_Request_bp.route('/new-request', methods=['GET', 'POST'])
def new_request():
    if request.method == 'POST':
        serviceArea = request.form.get('serviceArea')
        typeOfService = request.form.get('service-type')
        serviceDescription = request.form.get('service-description')
        availableDatesStart = request.form.get('available-dates-start')
        availableDatesEnd = request.form.get('available-dates-end')

        success = add_new_request(serviceArea, typeOfService, serviceDescription, availableDatesStart,
                                  availableDatesEnd)

        if success:
            flash('Request submitted successfully!', 'success')
            return redirect(url_for('myRequests.my_requests'))  # Updated this line
        else:
            flash('Failed to submit request. Please try again.', 'error')

    return render_template('New_Request_Page.html')


@New_Request_bp.route('/get-service-data')
def get_service_data():
    service_types = list(set(volunteer['typeOfService'] for volunteer in volunteers_col.find()))
    service_areas = list(set(volunteer['serviceArea'] for volunteer in volunteers_col.find()))
    return jsonify({
        'serviceTypes': service_types,
        'serviceAreas': service_areas,
        'statuses': statuses
    })