# app.py
from flask import Flask, render_template, request, redirect, url_for
import logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'karinAndAfik'

from pages.contactMethods.Contact_Methods import Contact_Methods_bp
app.register_blueprint(Contact_Methods_bp)

from pages.forgotPassword.Forgot_Password_Page import Forgot_Password_bp
app.register_blueprint(Forgot_Password_bp)

from pages.homePage.Home_Page import Home_Page_bp
app.register_blueprint(Home_Page_bp)

from pages.myRequests.My_Requests import My_Requests_bp
app.register_blueprint(My_Requests_bp)

from pages.newRequest.New_Request import New_Request_bp
app.register_blueprint(New_Request_bp)


from pages.passwordReset.Password_Reset import Password_Reset_bp
app.register_blueprint(Password_Reset_bp)


from pages.profileEditing.Profile_Editing import Profile_Editing_bp
app.register_blueprint(Profile_Editing_bp)


from pages.profile.Profile import Profile_bp
app.register_blueprint(Profile_bp)


from pages.register.Register import Register_bp
app.register_blueprint(Register_bp)


from pages.requestDetails.Request_Details import Request_Details_bp
app.register_blueprint(Request_Details_bp)


from pages.serviceFeedback.Service_Feedback import Service_Feedback_bp
app.register_blueprint(Service_Feedback_bp)


from pages.signIn.Sign_In import Sign_In_bp
app.register_blueprint(Sign_In_bp)


from pages.volunteerProfile.Volunteer_Profile import Volunteer_Profile_bp
app.register_blueprint(Volunteer_Profile_bp)


from pages.volunteersList.Volunteers_List import Volunteers_List_bp
app.register_blueprint(Volunteers_List_bp)


if __name__ == '__main__':
    app.run(debug=True)