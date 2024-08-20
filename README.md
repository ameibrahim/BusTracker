PROJECT TITLE: BUS TRACKER APP

PROJECT DESCRIPTION:
This is a web app developed to track a bus using a GPS tracker attached to a bus. The app is built using NodeJS with Express

INSTALLATION:
1. Clone the repository:
    ```
    git clone https://github.com/davidkambala/GPS_Tracker
    ```
2. Navigate into the project directory:
    ```
    cd GPS_Tracker
    ```
3. Install the dependencies:
    ```
    npm install
    ```
4. Set up environment variables (if any):
    - Create a `.env` file in the root directory.
    - Add the following environment variables:
      ```
      EMAIL="XXXXXX@gmail.com"
      PASSWORD="XXXXXX"
      DEVICE_ID=XXXXXXXXX
      ```
Those environment variables are related to the GPS tracker

USAGE:
To launch the app, you will need two terminals. In the first one launch the GPS API which should run on the port 4000 using the command: 
``` bash
node gpsAPI.js
```
 then run the web app concurently int the second terminal by using the command:
 ```
node server.js
```
THE APP WILL BE RUNNING ON http://localhost:3000 BY DEFAULT
