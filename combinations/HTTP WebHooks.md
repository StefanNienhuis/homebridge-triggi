# HTTP Webhooks
## What are HTTP Webhooks
You can also add a sensor in homekit. And its checking if something like the weather tommorow is sunny. Then it turns on your connector. And if you want a sensor in homekit that checks if tommorow is sunny. You wil to install this homebridge plugin [HTTP Webhooks](https://www.npmjs.com/package/homebridge-http-webhooks). 

## How to install HTTP Webhooks
First if you haven't installed homebridge yet install it by using the command:

`npm install -g homebridge`

Then install HTTP Webhooks by the command:

`npm install -g homebridge-http-webhooks`

Now you're done installing, now you can go over to the next paragraph and see how to setup!

## How to setup HTTP Webhooks and Triggi
### Config.json
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

### Port forwarding
For HTTP Webhooks to work you need to port-forward the port, to do that search a tutorial on google, for the port you need to put the port you gave it in the config.json file.

### Setup triggi
In Triggi make a new trigg choose an when condition, and then in the then action select Triggi Connect, Send an HTTP request with options, here set the first fieldfrom GET to POST, then in the second field you need to put an url.

YOURROUTERIP:WEBHOOKPORT/?accessoryId=ID&state=true

* YOURROUTERIP: You can get your router ip from whatsmyip.org.
* WEBHOOKPORT: The port you have just port-forwarded.
* ID: The id you gave the sensor in the config.json file.

And in the last field you don't have to fill in anything.

Now you have succesfully installed the Triggi plugin and the HTTP Webhooks plugin!
