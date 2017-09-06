var request = require('request');
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
  this.platform = platform;
  this.log = log;
  this.name = config.name;
  this.type = config.type || "push";
  this.connecturl = config.connecturl
  this.connector = new Triggi(this.connecturl);

  // Check for valid config

  if (this.type != "push" && this.type != "switch" && this.type != "outlet") {
    log.error('Invalid type, please use "push", "switch" or "outlet"!');
    log.error('Now using default "push."')
    this.type = "push"
  }

  if (!this.connecturl.startsWith("https://connect.triggi.com/c/")) {
    log.error('There is something wrong with your connect on URL! Make sure your URL starts with "https://"')
  }

  if (this.type == "push" || this.type == "switch") {
    this.service = new Service.Switch(this.name);

    this.service
      .getCharacteristic(Characteristic.On)
      //.on('get', this.getOn.bind(this))
      .on('set', this.setOn.bind(this));
  } else if (this.type == "outlet") {
    this.service = new Service.Outlet(this.name)

    this.service
      .getCharacteristic(Characteristic.On)
      //.on('get', this.getOn.bind(this))
      .on('set', this.setOn.bind(this));

    this.service
      .setCharacteristic(Characteristic.OutletInUse, true)
  }
}

TriggiAccessory.prototype.getInformationService = function() {
  var informationService = new Service.AccessoryInformation();
  informationService
    .setCharacteristic(Characteristic.Name, this.name)
    .setCharacteristic(Characteristic.Manufacturer, 'StefanNienhuis')
    .setCharacteristic(Characteristic.Model, this.type.charAt(0).toUpperCase() + this.type.slice(1))
    .setCharacteristic(Characteristic.SerialNumber, this.connecturl.replace("https://connect.triggi.com/c/", ""));

  return informationService;
}

TriggiAccessory.prototype.getServices = function() {
  return [this.service, this.getInformationService()];
};

/* Requested feature: get value of connector from Triggi
TriggiAccessory.prototype.getOn = function(callback) {

}
*/

TriggiAccessory.prototype.setOn = function(on, callback) {
  var accessory = this;

  if (accessory.type == "push") {
    // Accessory is a push button
    if (+on == 1) {
      accessory.connector.setOn();
      callback(accessory.service.setCharacteristic(Characteristic.On, 0));
    }

  } else if (accessory.type == "switch" || accessory.type == "outlet") {
    // Accessory is an switch or outlet

    accessory.connector.setValue('' + +on);
    callback(null);
  }
}
