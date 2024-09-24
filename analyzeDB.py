from db_connector import users_col, volunteers_col, requests_col, feedback_col


def print_all_users():
    users = users_col.find()
    for user in users:
        print(user)

def print_all_volunteers():
    volunteers = volunteers_col.find()
    for volunteer in volunteers:
        print(volunteer)

def print_all_requests():
    requests = requests_col.find()
    for request in requests:
        print(request)

def print_all_feedback():
    feedbacks = feedback_col.find()
    for feedback in feedbacks:
        print(feedback)


def analyze_db():
    print("Users Collection:")
    print_all_users()

    print("\nVolunteers Collection:")
    print_all_volunteers()

    print("\nRequests Collection:")
    print_all_requests()

    print("\nFeedbacks Collection:")
    print_all_feedback()


# execute analyze_db() when run
if __name__ == '__main__':
    analyze_db()
