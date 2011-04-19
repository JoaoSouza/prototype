(function (global) {
	"use strict";
	var typeof_function = "typeOf", prototype_object = "prototype", i = 0,
		objects = [Function, Object, Array, String, Number, Boolean, RegExp],
		theTypeOf, typeOf, protoTypeOf, types = [];

	protoTypeOf = function () {
		return typeOf(this);
	};

	typeOf = function (value) {
		var TheTypeOfValue = theTypeOf(value),
			type = false;
		if (typeof value === "number") {		
			return TheTypeOfValue.isNumber();
		} else if (typeof value === "string") {
			return TheTypeOfValue.isString();
		} else if (typeof value === "function") {
			if ((type = TheTypeOfValue.isFunction()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isRegExp()) !== false) {
				return type;
			}
		} else if (typeof value === "boolean") {
			return TheTypeOfValue.isBoolean();
		} else if (typeof value === "undefined") {
			return TheTypeOfValue.isUndefined();
		} else if (typeof value === "object") {
			if ((type = TheTypeOfValue.isUndefined()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isNull()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isString()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isArray()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isDate()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isNumber()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isBoolean()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isRegExp()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isOthers()) !== false) {
				return type;
			}
			if ((type = TheTypeOfValue.isObject()) !== false) {
				return type;
			}	
		}
	};
	
	theTypeOf = function (value) {
		var isNumber = function (cancel, val) {
				var oldvalue = value;
				value = typeof value === "number" ? value : typeof value.valueOf === "function" ? value.valueOf() : null;
				if (typeof value === "number") {
					if (isNaN(value) === false) {
						if (isFinite(value) === true) {
							return "number";
						} else {
							if (value === (+Infinity)) {
								return "positive infinity number";
							} else {
								return "negative infinity number";
							}
						}
					} else {
						return "not a number";
					}
				} else {
					value = oldvalue;
					return false;
				}
			},
			isArray = function () {
				if (
					value &&
						typeof value === "object" &&
						typeof value.length === "number" &&
						typeof value.splice === "function" &&
						value.propertyIsEnumerable("length") === false
				) {
					return "array";
				} else {
					return false;
				}
			},
			isRegExp = function (cancel, val) {
				value = typeof val !== "undefined" ? val : value;
				if (
					value &&
						typeof value.global === "boolean" &&
						typeof value.ignoreCase === "boolean" &&
						typeof value.lastIndex === "number" &&
						typeof value.multiline === "boolean" &&
						typeof value.source === "string" &&
						typeof value.compile === "function" &&
						(
							typeof value === "function" ||
							typeof value === "object"
						)
				) {
					return "regexp";
				} else {
					return false;
				}
			},
			isFunction = function (cancel, val) {
				value = typeof val !== "undefined" ? val : value;
				if (
					value &&
						value.propertyIsEnumerable("length") === false &&
						typeof value.apply === "function" &&
						typeof value.call === "function"
				) {				
					return "function";				
				
				} else {
					return false;
				}

				
			},
			isString = function (cancel, val) {
				var oldvalue = value;
				value = typeof value === "string" ? value : typeof value.valueOf === "function" ? value.valueOf() : null;
				if (typeof value === "string") {
					return "string";
				} else {
					value = oldvalue;
					return false;
				}
			},
			isBoolean = function (cancel, val) {
				var oldvalue = value;
				value = typeof value === "boolean" ? value : typeof value.valueOf === "function" ? value.valueOf() : null;
				if (typeof value === "boolean") {
					return "boolean";
				} else {
					value = oldvalue;
					return false;
				}
			},
			isDate = function () {
				if (
					value &&
						typeof value.getTime === "function" &&
						typeof value.getUTCMilliseconds === "function" &&
						typeof value.setTime === "function" &&
						typeof value.setUTCMilliseconds === "function"
				) {					
					return "date";					
				} else {
					return false;
				}
			},
			isNull = function () {
				if (
					typeof value === "object" &&
						value === null
				) {
					return "null";
				} else {
					return false;
				}
			},
			isObject = function (obj) {
				if (typeof value === "object") {
					return "object";
				} else {
					return false;
				}
			},
			isUndefined = function () {
				if (typeof value === "undefined") {
					return "undefined";
				} else {
					return false;
				}
			},
			isOthers = function () {
				var i = types.length,
					type;
				while (i !== 0) {
					i -= 1;
					type = types[i].call(global, value);
					if (type !== false) {
						return type;
					}
				}				
				return false;
			};
		
		return {
			isNumber: isNumber,
			isString: isString,
			isRegExp: isRegExp,
			isFunction: isFunction,
			isBoolean: isBoolean,
			isUndefined: isUndefined,
			isNull: isNull,
			isObject: isObject,
			isArray: isArray,
			isDate: isDate,
			isOthers: isOthers
		};
	};		

	typeOf.add = function (type) {
		if (typeOf(type) === "function") {
			types.push(type);
		}
	};

	for (i = 0; i < objects.length; i += 1) {
		objects[i][prototype_object][typeof_function] = protoTypeOf;
	}
	
	global[typeof_function] = typeOf;
}(this));