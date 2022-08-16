# FindHome

## A MERN Stack Web Application

Target: A web app to help people find and rent out their homes in Vancouver.

Group Members: Bingyan Li, Chengyu Zhang, Jiesi Zhang

Website Deployment:

- [https://www.findhome.cf/](https://www.findhome.cf/)

- [https://findfindhome.netlify.app/](https://findfindhome.netlify.app/)

Video Demo: [https://youtu.be/QTjKzyilC5I](https://youtu.be/QTjKzyilC5I)

## Setup Instructions

1. Clone all the code to your local computer.

2. Set up a [Nodejs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment) development environment.

3. Once you have set note setup. Run `npm install` in the root of your clone of this repo to install all the necessary packages.

4. Run `npm start` in the root path and open [http://localhost:3000](http://localhost:3000). This is the home page.

## Features

### Anonymous Users

- Search rooms by keyword, min/max price, home type and the number of rooms.

- Order the search result by price.

- See the details of the room with pictures.

### Login Users

- Create the profile automatically when the user logs in for the first time.

- Update user's profile in **Update Profile** page.

  As Owners

  - Release the housing resources in **Rent Out** page, read/update/delete them in **My Room** page.

  - Read/delete the applications with messages from the applicants in **Received Application** page.

  As Tenants

  - Apply for room from the **Room Details** page with massages.

  - Read/delete the applications in **My Appliction** page.

## Pages

### Home Page

![Home Page](/client/public/image/home_page.png)

The home page for our website. Show some instructions for our website.

**Home Button**. Return home page.

**Room Button**. Go to search room page.

**Profile Menu**

- **Profile**. See the user profile. If the user has not logged in, jump to login page.

- **LogIn/LogOut**. Login if has not logged in or logout if the user has logged in.

### Log In

![Log in](/client/public/image/login.png)

Sign up/Log in with email and password, or with Google via auth0. After logging in, jump to My Profile.

### My Profile

![Profile](/client/public/image/profile.png)

Show the basic info for user. If the user logs in for the first time, create the profile automatically.

**Update Profile**. User can update their profile info.

**My application**. Read/Delete the submitted applications as an applicant.

**My Room**. Read/Update/Delete rooms info.

**Rent Out**. Rent out room.

**Received Application**. Read/Delete the received applications from others.

### Update Profile

![Update Profile](/client/public/image/update_profile.png)

Update the user profile. After submitting, jump to My Profile.

### My Application

![My Application](/client/public/image/my_application.png)

Read/Delete the submitted applications as an applicant. The ellipsis icon allows user to read the room details. The delete icon allows user to delete this application.

### Rent Out

![Rent Out](/client/public/image/rent_out.png)

Fills in a form to release the renting info. After submitting, jump to this room detail page.

### Received Application

![Received Application](/client/public/image/received_application.png)

Read/Delete the received applications from others. The ellipsis icon allows user to read the room details. The delete icon allows user to delete this application.

### My Room

![My Room](/client/public/image/my_room.png)

The edit icon allows user to update the room. The delete icon allows user to delete this application. The ellipsis icon allows user to read the room details.

### Update Room

![Update Room](/client/public/image/update_room.png)

Update room info. After submitting, jump to this room detail page.

### My Room Detail

![My Room Detail](/client/public/image/my_room_detail.png)

Show the room details for the owner.

**Return**. Return to the my room list.

**Edit**. Edit this room.

### Search Page

![Search Page](/client/public/image/search_page.png)

Search home based on a specific set of criteria.

**Keyword**. Search for keyword in title, address and details.

**Price Sort**. Low to high price sort in default.

**Min/Max Price**. Set price interval by slider.

**Home Type**. The type of room.

**Room Number**. The number of rooms.

**Pagination**. Each page shows 10 rooms. Users can change the page number.

After filling in the criteria and clicking on submit button, return the list of homes that meet the requirements.

### Home Detail

![Home Detail](/client/public/image/home_detail.png)

Show the details of home, including pictures.

**Apply**.

Annonymous User: Shows prompts and log in button.

![Apply annoymous](/client/public/image/apply_not_login.png)

Login User:

Have applied successfully: Shows success infomation.

![Apply success](/client/public/image/have_applied.png)

Have not applied: Show the apply button. Click on it to show the message textarea and submit button.

![Apply for Home](/client/public/image/apply_home.png)

**Submit**. Submit application to the owner. If successful, jump to My Application page.

**Cancel**. Return to the Home Detail page.

### Responsive Design

![Profile Responsive](/client/public/image/profile_responsive.png)

Special design for navigation bar for narrow screen.

## Documents

### Database Design

![ERD](/client/public/image/DB_ERD.png)

3 collections in this project: Profile, Home, and Application.

### Interface API Document

https://docs.google.com/document/d/1jNsBH7WnzXSaUTe4FDwtJYWxNjeLNr7dKYzGrlI0hXg/edit?usp=sharing

## Iteration-2

### New Progress

- Search home based on a specific set of criteria.

- Picture showing.

- Read/Delete the submitted applications as an applicant.

- Releasing room.

- Read/Delete the received applications from others.

- Read/Update/Delete rooms info.

### Contributions

Frontend

- Bingyan Li:

  - Rent out page.

  - Update room page.

  - Received application page.

  - My application page.

- Chengyu Zhang:

  - Profile update page.

  - Search room/Room detail page.

  - Apply room page.

  - My room page.

Backend

- Jiesi Zhang

  - Update db queries.

  - Test db queries.

  - Add search room query with multiple conditions.

  - App Deployment.

## Iteration-3

### New Progress

- Brand new UI.

- Try the pictures upload feature. (Incompleted due to the limited time)

### Contributions

Frontend

- Bingyan Li:

  - Update UI for main page, search page.

  - Add read data to the database.

- Chengyu Zhang:

  - Update UI for Pages in the Profile.

  - Try the pictures upload feature.

Backend

- Jiesi Zhang

  - Try the pictures upload feature.

  - Add read data to the database.
