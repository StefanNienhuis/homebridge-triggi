var Triggi = require('node-triggi');
var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;

  homebridge.registerPlatform('homebridge-triggi', 'Triggi', TriggiPlatform);
  homebridge.registerAccessory('homebridge-triggi', 'TriggiAccessory', TriggiAccessory);
};

function TriggiPlatform(log, config) {
  log.error('Due to the rename of Triggi, this package was replaced by homebridge-olisto. Install it with: npm install -g homebridge-olisto. This package will no longer work.')
  this.log = log;
  this.triggs = config.triggs;
}

TriggiPlatform.prototype.accessories = function(callback) {
  this.accessories = [];

  for (var i = 0; i < this.triggs.length; i++) {
    var triggiAccessory = new TriggiAccessory(this.log, this.triggs[i], this);
    this.accessories.push(triggiAccessory);
  }

  callback(this.accessories);
}

function TriggiAccessory(log, config, platform) {

}
