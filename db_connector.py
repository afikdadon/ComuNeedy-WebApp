# db_connector.py
from datetime import datetime
from flask import session
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import random
import logging

uri = "mongodb+srv://afik:afik2024@cluster0.hduil2j.mongodb.net/?appName=Cluster0"

# create cluster
cluster = MongoClient(uri, server_api=ServerApi('1'))

# Connection to database
mydatabase = cluster['mydatabase']
# project collections
users_col = mydatabase['users']
volunteers_col = mydatabase['volunteers']
requests_col = mydatabase['requests']
feedback_col = mydatabase['feedback']


### ABOUT VOLUNTEERS -  It is an external interface - a volunteer's entry and update is carried out
#                        by the system administrator and further to the comments from Part A - there is no reference
#                        to him on the site.

# function to insert volunteers
def insert_volunteers(volunteers_list):
    for volunteer in volunteers_list:
        if not volunteers_col.find_one({'volunteerID': volunteer['volunteerID']}):
            volunteers_col.insert_one(volunteer)
            print(f"Inserted volunteer: {volunteer['firstName']}")
        else:
            print(f"volunteer already exists: {volunteer['firstName']}")


# function to initialize the database
def initialize_db():
    volunteers_list = [
        {
            "volunteerID": 1,
            "firstName": "Alice",
            "lastName": "Johnson",
            "gender": 'Female',
            "birthDate": '2000-05-20',
            "languages": 'Hebrew',
            "typeOfService": 'Healthcare',
            "serviceArea": 'North',
            "averageRating": 4.3
        },
        {
            "volunteerID": 2,
            "firstName": "Bob",
            "lastName": "Smith",
            "gender": 'Male',
            "birthDate": '1995-12-10',
            "languages": ['Hebrew', 'English'],
            "typeOfService": 'Technical Support',
            "serviceArea": 'Eilat',
            "averageRating": 3.8
        },
        {
            "volunteerID": 3,
            "firstName": "Carol",
            "lastName": "White",
            "gender": 'Female',
            "birthDate": '1987-03-03',
            "languages": ['Hebrew', 'English'],
            "typeOfService": 'Home Improvement',
            "serviceArea": 'Jerusalem',
            "averageRating": 4.7
        },
        {
            "volunteerID": 4,
            "firstName": "David",
            "lastName": "Brown",
            "gender": 'Male',
            "birthDate": '1987-09-15',
            "languages": 'Hebrew',
            "typeOfService": 'Animal Care',
            "serviceArea": 'North',
            "averageRating": 4.0
        },
        {
            "volunteerID": 5,
            "firstName": "Emma",
            "lastName": "Davis",
            "gender": 'Female',
            "birthDate": '1965-07-30',
            "languages": ['Hebrew', 'English', 'Russian'],
            "typeOfService": 'Healthcare',
            "serviceArea": 'Center',
            "averageRating": 3.9
        },
        {
            "volunteerID": 6,
            "firstName": "Frank",
            "lastName": "Miller",
            "gender": 'Male',
            "birthDate": '1975-08-08',
            "languages": ['Hebrew', 'English', 'Russian'],
            "typeOfService": 'Animal Care',
            "serviceArea": 'South',
            "averageRating": 4.2
        }
    ]

    insert_volunteers(volunteers_list)
def fetch_volunteer():
    return volunteers_col

def find_one_volunteer_by_ID(volunteer_id):
    return volunteers_col.find_one({'volunteerID': volunteer_id})


def add_new_user(email, firstName, lastName, phoneNumber, securityQuestion, password):
    # Check if the user already exists
    if users_col.find_one({'email': email}):
        return False, "User already exists with that email."

    new_user = {
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumber": phoneNumber,
        "securityQuestion": securityQuestion,
        "password": password
    }

    # Insert the new user into the database
    result = users_col.insert_one(new_user)
    success_message = f"Welcome {firstName}, glad you joined us!"
    return True, success_message


def find_one_user(email):
    user = users_col.find_one({'email': email})
    return user


# update a user's information
def update_one_user(email, user):
    # Perform the update operation
    result = users_col.update_one({"email": email}, {"$set": user})

    if result.modified_count == 0:
        # no information was modified
        return False, "No changes were made to the user."

    # Successful update
    return True, "User updated successfully."


def get_volunteer_name(volunteer_id):
    volunteer = volunteers_col.find_one({'volunteerID': volunteer_id})
    if volunteer:
        return f"{volunteer.get('firstName', '')} {volunteer.get('lastName', '')}".strip()
    return "Not assigned"


def fetch_user_requests(email):
    logging.info(f"Fetching requests for email: {email}")
    user_requests = requests_col.find({'userEmail': email})
    formatted_requests = []
    for request in user_requests:
        logging.info(f"Found request: {request}")
        volunteer_name = get_volunteer_name(request.get('selectedVolunteer'))
        formatted_request = {
            'id': str(request.get('requestID')),
            'title': request.get('serviceDescription', ''),
            'type': request.get('typeOfService', ''),
            'openDate': request.get('openDate', ''),
            'completionDate': request.get('completionDate', '-'),
            'volunteer': volunteer_name,
            'status': request.get('status', ''),
            'serviceArea': request.get('serviceArea', ''),
            'availableDatesStart': request.get('availableDatesStart', ''),
            'availableDatesEnd': request.get('availableDatesEnd', '')
        }
        formatted_requests.append(formatted_request)
    logging.info(f"Formatted requests: {formatted_requests}")
    return formatted_requests


def check_security_question(email, answer):
    print(f"Checking security question for email: {email}")  # Debug print
    user = users_col.find_one({'email': email})
    print(f"User found: {user}")  # Debug print
    if user and user.get('securityQuestion') == answer:
        print("Security question verified")  # Debug print
        return True
    print("Security question failed")  # Debug print
    return False


def reset_user_password(token, new_password):
    user = users_col.find_one({'email': token})

    if user:
        # In a real application, you should hash the new password before storing it
        users_col.update_one({'email': token}, {'$set': {'password': new_password}})
        return True, "Password has been reset successfully!"
    else:
        return False, "Invalid or expired token."


def find_request_by_id(request_id):
    request_id = int(request_id)
    request = requests_col.find_one({'requestID': request_id})
    return request


def add_new_request(serviceArea, typeOfService, serviceDescription, availableDatesStart, availableDatesEnd):
    # Get the next available requestID
    last_request = requests_col.find_one(sort=[("requestID", -1)])
    new_request_id = 1 if last_request is None else last_request["requestID"] + 1

    # Get the user's email from the session
    user_email = session.get('email')
    if not user_email:
        raise ValueError("User email not found in session")

    # Select a random volunteer
    all_volunteers = list(volunteers_col.find({"typeOfService": typeOfService}, {"volunteerID": 1}))
    if not all_volunteers:
        raise ValueError("No volunteers found for the selected service type")
    selected_volunteer = random.choice(all_volunteers)["volunteerID"]

    # Create the new request document
    new_request = {
        "requestID": new_request_id,
        "userEmail": user_email,
        "serviceArea": serviceArea,
        "typeOfService": typeOfService,
        "serviceDescription": serviceDescription,
        "availableDatesStart": availableDatesStart,
        "availableDatesEnd": availableDatesEnd,
        "selectedVolunteer": selected_volunteer,
        "status": "Pending",
        "completionDate": None,
        "openDate": datetime.now().strftime("%Y-%m-%d")
    }

    # Insert the new request into the database
    result = requests_col.insert_one(new_request)

    if result.inserted_id:
        return True
    else:
        return False


def add_new_feedback(volunteer_id, request_id, rating, description):
    feedback = {
        'volunteer_id': volunteer_id,
        'request_id': request_id,
        'rating': rating,
        'description': description
    }
    result = mydatabase.feedback.insert_one(feedback)
    return result.inserted_id


def update_volunteer_rating(volunteer, rating):
    try:
        # Calculate the new totalReviews and totalStars
        total_reviews = volunteer.get('totalReviews', 0) + 1
        total_stars = volunteer.get('totalStars', 0) + rating

        # Calculate the new averageRating
        average_rating = round(total_stars / total_reviews, 2)

        # Update the volunteer document
        result = volunteers_col.update_one(
            {'volunteerID': volunteer.get('volunteerID')},  # Ensure correct field name and type
            {
                '$set': {
                    'totalReviews': total_reviews,
                    'totalStars': total_stars,
                    'averageRating': average_rating
                }
            }
        )

        if result.modified_count == 0:
            return False, "No changes were made to the volunteer."

        return True, "Volunteer rating updated successfully."
    except Exception as e:
        print(f"Error updating volunteer rating: {e}")
        raise


# a list of statuses
statuses = ['Completed', 'Pending', 'In-progress']

# Run the initialize_db function if this script is executed directly
if __name__ == '__main__':
    initialize_db()