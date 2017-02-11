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
    this.connecturl = config.connecturl;

    if (this.connecturl.startsWith("https://connect.triggi.com/c/")) {

    } else {
        throw new Error('There is something wrong with your connect URL!');
    }

}

TriggiAccessory.prototype.getServices = function() {
    var log = this.log;
    var name = this.name;
    var connecturl = this.connecturl;

    this.triggiService = new Service.Switch(this.name);
    var service = this.triggiService;

    this.triggiService.getCharacteristic(Characteristic.On).on('set', function(value, callback) {
        if (value == 1) {
            request(connecturl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    service.setCharacteristic(Characteristic.On, 0);
                    log('[' + name +'] Fired trigg!');
                } else {
                    console.log("ERROR");
                }
            });
            service.setCharacteristic(Characteristic.On, 0);
            callback();
        } else {
            callback();
        }
        this.triggiService = service;
    });

    return [this.triggiService];
};
