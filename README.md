# homebridge-triggi
## What is homebridge-triggi
With homebridge-triggi you can use all your Triggi services in homekit. In homekit you have a button, if you press that button it wil connect to the Triggi server and run your action!

## How to install
First if you haven't installed homebridge yet install it by using the command:

`npm install -g homebridge`

Then install this plugin by using the command:

`npm install -g homebridge-triggi`

Now you're done with installing. Now we want to setup the Triggi app!

## How to set up Triggi
First go to triggi.com/connect/ log in and choose a username. Once thats done create a new connector. You can call it whatever you want. Now you should get an e-mail on the e-mail adress you're registered at Triggi. Keep this e-mail in your mailbox. Then open up your triggi app on your phone/tablet. Go to channels, Triggi Connect, Devices and add connector. In the field you put the public token. This is defined in the e-mail you have got from Triggi. And then add the connector. Then add a new trigg. Choose the when condition and select Triggi Connect. Now select the connector you have just added. Then in the Then action you can choose what you want to happen when you press the button. Then click save trigg and name it whatever you want!

## Sample config.json
This is the sample config.json for homebridge.
```
"platforms": [
        {
            "platform": "Triggi",
            "triggs": [
                {
                    "name": "Yeah it's weekend! Tweet it!",
                    "connecturl": "YOUR CONNECT URL HERE"
                },
                {
                    "name": "Refueld my car",
                    "connecturl": "YOUR CONNECT URL HERE"
                }
            ]
        }
    ]
```

* platform: Must always be Triggi.
* triggs: A dictionary of all the triggs you want in homekit
* triggs/name: The name that you want the button to have in homekit.
* triggs/connecturl: Here you put the connect url that is defined in the e-mail Triggi has send to you.









