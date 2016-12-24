var request = require('request');
var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-triggi', 'Triggi', Triggi);
};

function Triggi(log, config) {
    this.log = log;
    this.config = config;

    this.name = config.name || "Event";
    this.connecturl = config.connecturl || "";

    var connecturl = this.connecturl

    if (connecturl.startsWith("https://connect.triggi.com/c/")) {
      this.connecturlright = true;
    } else {
      log.info("There's something wrong with your connect URL!");
      this.connecturlright = false;
    }
}

Triggi.prototype = {
    getServices: function() {
        this.services = [];

        var switchService = new Service.Switch(this.name);
        var connecturl = this.connecturl;

        switchService.getCharacteristic(Characteristic.On).on('set', function(value, callback) {
            if (value == 1) {
                request(connecturl, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        switchService.setCharacteristic(Characteristic.On, 0);
                    } else {
                        console.log("ERROR");
                    }
                })
                switchService.setCharacteristic(Characteristic.On, 0);

            }

            callback();
        });

        this.services.push(switchService);

        return this.services;
    }

}
