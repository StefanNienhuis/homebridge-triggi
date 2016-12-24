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
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:30",
        "port": 51826,
        "pin": "031-45-154"
    },
    
    "description": "This is an example configuration file for the homebridge-triggi plugin!",

    "accessories": [
        {
            "accessory" : "Triggi",
            "name" : "Send E-Mail",
            "connecturl" : "YOUR CONNECT URL"
        }
    ],

    "platforms": [
        {}
    ]
}
```

* accessory: Must always be Triggi.
* name: The name you want it to show in homekit.
* connecturl: Here you put the connect url that is defined in the e-mail Triggi has send to you.

## HTTP Webhooks
### What are HTTP Webhooks
You can also add a sensor in homekit. And its checking if something like the weather tommorow is sunny. Then it turns on your connector. And if you want a sensor in homekit that checks if tommorow is sunny. You wil to install this homebridge plugin [HTTP Webhooks](https://www.npmjs.com/package/homebridge-http-webhooks). 

### How to install HTTP Webhooks
First if you haven't installed homebridge yet install it by using the command:

`npm install -g homebridge`

Then install HTTP Webhooks by the command:

`npm install -g homebridge-http-webhooks`

Now you're done installing, now you can go over to the next paragraph and see how to setup!

### How to setup HTTP Webhooks and Triggi
#### Config.json
First of all we need to setup the config.json file for HTTP Webhooks. To do this take a look at the config sample down below.

```
    "platforms": [
      {
        "platform": "HttpWebHooks",
        "webhook_port": 51828,
        "cache_directory": "./.node-persist/storage",
        "sensors" : [
            {
            "id": "Sensor",
            "name": "Triggi Sensor",
            "type": "occupancy"
            }
        ]
        }
    ]
```

Something very IMPORTANT is that you have to put this in your platforms section, not in accessories like the Triggi plugin!
You only have to change the properties in the sensors section.

* id: here you wil put the id you use to call this sensor from Triggi.
* name: The name you want the sensor to have in homekit.
* type: Must be occupancy.

#### Port forwarding
For HTTP Webhooks to work you need to port-forward the port, to do that search a tutorial on google, for the port you need to put the port you gave it in the config.json file.

#### Setup triggi
In Triggi make a new trigg choose an when condition, and then in the then action select Triggi Connect, Send an HTTP request with options, here set the first fieldfrom GET to POST, then in the second field you need to put an url.

YOURROUTERIP:WEBHOOKPORT/?accessoryId=ID&state=true

* YOURROUTERIP: You can get your router ip from whatsmyip.org.
* WEBHOOKPORT: The port you have just port-forwarded.
* ID: The id you gave the sensor in the config.json file.

And in the last field you don't have to fill in anything.

Now you have succesfully installed the Triggi plugin and the HTTP Webhooks plugin!









