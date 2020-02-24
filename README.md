# Simple-Application
Simple application using express nodejs in typescript with sequelize mysql

# Instruction Guide to run in local
Steps
1. Git clone https://github.com/ycsiow888/Simple-Application.git into local
2. Move to folder inside and enter npm install
3. Create database called 'simple_app' and import simple_app.sql into xampp
4. Rename .env.example to .env (you may change information here to your environment)
5. Enter npm install
6. Enter npm run dev to run in local development mode
7. Enter npm run build to compile typescript into javascript
8. Enter npm run start and you may browse in http://localhost:5000

# Available API Endpoint
1. http://localhost:5000/api/register
2. http://localhost:5000/api/commonstudents?teacher=teacher01@hotmail.com
3. http://localhost:5000/api/suspend
4. http://localhost:5000/api/retrievefornotifications
