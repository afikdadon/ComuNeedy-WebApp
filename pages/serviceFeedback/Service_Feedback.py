from flask import Blueprint, render_template, request, jsonify
from db_connector import update_volunteer_rating, find_request_by_id, add_new_feedback, find_one_volunteer_by_ID
import traceback

Service_Feedback_bp = Blueprint(
    'serviceFeedback',
    __name__,
    static_folder='static',
    static_url_path='/serviceFeedback/static',
    template_folder='templates'
)


@Service_Feedback_bp.route('/service_feedback')
def Service_Feedback_Page():
    volunteer_id = request.args.get('volunteer')
    request_id = request.args.get('request_id')

    return render_template('Service_Feedback_Page.html',
                           volunteer_id=volunteer_id,
                           request_id=request_id)


@Service_Feedback_bp.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    try:
        data = request.json
        print("Received data:", data)

        rating = int(data['rating'])  # Ensure rating is an integer
        description = data['description']
        request_id = data['requestId']

        # Find the request in the database
        request_data = find_request_by_id(request_id)
        print("request_data:", request_data)

        if not request_data:
            print(f"Request not found for ID: {request_id}")
            return jsonify({'success': False, 'message': 'Request not found'}), 404

        volunteer_id = request_data['selectedVolunteer']
        print(f"Volunteer ID: {volunteer_id}")

        # Find volunteer data
        volunteer = find_one_volunteer_by_ID(volunteer_id)

        print(f"Volunteer after: {volunteer}")
        if not volunteer:
            print(f"Volunteer not found for ID: {volunteer_id}")
            return jsonify({'success': False, 'message': 'Volunteer not found'}), 404

        # Add new feedback
        feedback_id = add_new_feedback(volunteer_id, request_id, rating, description)
        print(f"Feedback added with ID: {feedback_id}")

        # Update volunteer rating
        success, message = update_volunteer_rating(volunteer, rating)
        print(f"Volunteer rating update status: {message}")

        if not success:
            return jsonify({'success': False, 'message': message}), 500

        return jsonify({'success': True, 'message': 'Feedback submitted successfully'})
    except Exception as e:
        print("Error in submit_feedback:")
        print(traceback.format_exc())
        return jsonify({'success': False, 'message': str(e)}), 500
