**Secure Chat App with Cryptography**
*Author: Dostonbek Toirov*

**Before Running the App**

Open a terminal and go to the folder where the app is located by running:

`cd Code/`

Start the virtual environment by running:

`source venv/bin/activate`

After this command `(venv)` will appear at the beginning of the terminal prompt meaning you are in the virtual environment.

If this does not work in your case, then you can continue without having to be inside the virtual environment, but you need to install the program requirements by running:

`pip install -r requirements.txt`

**Running the app**

Now it is time to start our app. Simply run:

`python3 app.py`

This will start the app on `localhost:5000` and you can view the app running through that link on the browser.

On the welcome page, there are two buttons showing two options. 

###**Start a New Chat**
 - To start a new chat we can choose "Start Chat**. 
 - On the pop-up, we need to put a username we want (maximum 9 characters) and press "Generate Key" to generate a new room key. 
 - Then we can press "Start Chat". It will take us to a new page with where we can start messaging. 
 - Simply type anything in the message box, and set the **Secret Key** to a number you'd like. Then either hit "Enter" or press the button with send icon. 

This should display the message in the field top of the message box with a sender's name to the left. For now, it is only you in the chat room. 

###**Join Chat**
 - To have other 'chatters' in this room, simply copy the chat room key to the bottom of the message box. 
 - Open a new tab in the browser and go to `localhost:5000`. 
 - Press "Join Chat". 
 - Fill in your name and paste the copied chat room key to the chat room key field. 
 - Press "Start Chat". 
 - Then, set the **Secret Key** the same as the other 'chatter'.

Now you can start having a chat between the two 'chatters'. 

###**To view the cryptography happening**
 - Right-click on the browser page.
 - Choose "Inspect element"
 - From a set of tabs, choose "Console".
 - Try sending messaging and the encrypted version of your messages will display on there. 
