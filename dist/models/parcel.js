"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Class for defining a parcel model
var Parcel =
/*#__PURE__*/
function () {
  function Parcel(id, name, origin, destination, weight, userId) {
    _classCallCheck(this, Parcel);

    this.id = id;
    this.name = name;
    this.origin = origin;
    this.destination = destination;
    this.weight = weight;
    this.userId = userId;
    this.setPrice();
  }

  _createClass(Parcel, [{
    key: "setPrice",
    value: function setPrice() {
      if (Number(this.weight)) {
        return this.price = parseFloat(this.weight) * 100;
      }

      return this.price = 0;
    }
  }]);

  return Parcel;
}();

var _default = Parcel;
exports.default = _default;