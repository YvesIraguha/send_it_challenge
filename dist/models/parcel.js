"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Class for defining a parcel model
var Parcel = function () {
  function Parcel(id, name, origin, destination, weight, userId) {
    _classCallCheck(this, Parcel);

    this.id = id;
    this.name = name;
    this.origin = origin;
    this.destination = destination;
    this.weight = weight;
    this.userId = userId;
    this.setPrice();
    this.setCreationDate();
  }

  _createClass(Parcel, [{
    key: "setPrice",
    value: function setPrice() {
      if (Number(this.weight)) {
        return this.price = parseFloat(this.weight) * 100;
      }
      return this.price = 0;
    }
  }, {
    key: "setCreationDate",
    value: function setCreationDate() {
      var currentDate = new Date();
      var date = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();
      var dateString = year + "-" + (month + 1) + "-" + date;
      return this.created_at = dateString;
    }
  }]);

  return Parcel;
}();

exports.default = Parcel;