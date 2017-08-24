var request = require('request');
var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    HomebridgeAPI = homebridge;

    homebridge.registerPlatform('homebridge-triggi', 'Triggi', TriggiPlatform);
    homebridge.registerAccessory('homebridge-triggi', 'TriggiAccessory', TriggiAccessory);
};

function TriggiPlatform(log, config) {
    this.log = log;
    this.triggs = config.triggs;
}

TriggiPlatform.prototype = {
    accessories: function(callback) {
        this.accessories = [];
        this.triggiAccessories = [];

        for (var i = 0; i < this.triggs.length; i++) {
            var triggiAccessory = new TriggiAccessory(this.log, this.triggs[i], this);
            this.accessories.push(triggiAccessory);
            this.triggiAccessories.push(triggiAccessory);
        }

        callback(this.accessories);
    }
};

function TriggiAccessory(log, config, platform) {
    this.platform = platform;
    this.log = log;
    this.name = config.name;
    this.type = config.type || "push";
    this.connecturl = config.connecturl;

    if (!this.connecturl.startsWith("https://connect.triggi.com/c/")) {
      throw new Error('There is something wrong with your connect on URL!');
    }

}

TriggiAccessory.prototype.getServices = function() {
    var log = this.log;
    var name = this.name;
    var type = this.type
    var connecturl = this.connecturl;

    this.triggiService = new Service.Switch(this.name);
    var service = this.triggiService;

    this.triggiService.getCharacteristic(Characteristic.On).on('set', function(value, callback) {
        if (value == 1) {

          if (type == "push") {
            request(connecturl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    log('[' + name +'] Pushed trigg!');
                    service.setCharacteristic(Characteristic.On, 0);
                } else {
                    console.log("ERROR");
                }
            });
          } else if (type == "outlet") {
            request(connecturl + "?value=1", function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    log('[' + name +'] Set trigg value to 1!');
                } else {
                    console.log("ERROR");
                }
            });
          }

          callback();

        } else {
          if (type == "outlet") {
            request(connecturl + "?value=0", function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    log('[' + name +'] Set trigg value to 0!');
                } else {
                    console.log("ERROR");
                }
            });
          }

          callback();
        }
        this.triggiService = service;
    });

    return [this.triggiService];
};
