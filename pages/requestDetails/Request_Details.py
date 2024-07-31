from bson import json_util
import json
from flask import Blueprint, render_template, request
from db_connector import find_request_by_id

Request_Details_bp = Blueprint(
    'requestDetails',
    __name__,
    static_folder='static',
    static_url_path='/requestDetails/static',
    template_folder='templates'
)

@Request_Details_bp.route('/request_details')
def Request_Details_Page():
    request_id = request.args.get('id')
    print(f"Received request_id: {request_id}")
    if request_id:
        request_details = find_request_by_id(request_id)
        print(f"Retrieved request_details: {request_details}")
        if request_details:
            # Convert ObjectId to string
            request_details['_id'] = str(request_details['_id'])
            # Use json_util to handle MongoDB-specific types
            request_details_json = json.loads(json_util.dumps(request_details))
            return render_template('Request_Details.html', request_details=request_details_json)
        else:
            return "Request not found", 404
    else:
        return "Request ID not provided", 400