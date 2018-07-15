var hohenheimsd = function (){

  //_.chunk(array, [size=1])  
  //Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
  function chunk (array, size = 1) {
    var arr = [];
    var i = 0;
    while(i < array.length){
      arr.push(array.slice(i,i + size));
      i+=size;
    }
    return arr;
  }

  //_.compact(array)  Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
  var compact = array => array.filter(array=>array);

  //_.concat(array, [values])  Creates a new array concatenating array with any additional arrays and/or values.
  var concat = (array,...nums) => array.concat(...nums);


  // difference(array, [values]) this method returns a new array.
  var difference = function(array,...values){
    var valArr = [].concat(...values);
    return array.filter(x => !valArr.includes(x));
  };

  // _.drop(array, [n=1])  Creates a slice of array with n elements dropped from the beginning.
  var drop = (value, n = 1) => value.slice(n);

  //_.dropRight(array, [n=1]) Creates a slice of array with n elements dropped from the end.
  var dropRight = (value, n = 1) => value.slice(0,value.length - n);

  // _.fill(array, value, [start=0], [end=array.length]) Fills elements of array with value from start up to, but not including, end.
  var fill = (array, value, start = 0, end = array.length) => array.fill(value, start, end);

  //_.head(array)
  var head = value => value[0];

  //_.flatten(array) Flattens array a single level deep.
  var flatten = value => value.reduce((accumulator,currentValue)=>accumulator.concat(currentValue),[]);

  //_.flattenDeep(array) Recursively flattens array.
  var flattenDeep = value => {
    var tmp = [];
    var flattenDeep2 = value =>{
      for(var i of value){
        if(isArray(i)){
          flattenDeep2(i);
        }else {
          tmp = tmp.concat(i);
        }
      }
    }
    flattenDeep2(value);

    return tmp;
  };

  var isArguments =  value => Object.prototype.toString.call(value) === '[object Arguments]';

  var isArray =  value => Object.prototype.toString.call(value) === '[object Array]';

  var isArrayBuffer = value => Object.prototype.toString.call(value) === '[object ArrayBuffer]';

  var isArrayLike = value => value.length ? (typeof value != 'string' && typeof value != 'function' && typeof value.length == 'number' && value.length >= 0 && value.length < 2**32) : false;

  var isBoolean = value => Object.prototype.toString.call(value) === '[object Boolean]';

  var isDate = value => Object.prototype.toString.call(value) === '[object Date]';

  var isElement = value => value instanceof Element;

  var isEmpty = value => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'object') {
      let type = Object.prototype.toString.call(value).slice(8, -1);
      if (type === 'Set' || type === 'Map') {
        return !Boolean(value.size());
      }
      else {
        return !Boolean(Object.keys(value).length);
      }
    } else {
      return !Boolean(value.length);
    }
  };

  var isError = value => value instanceof Error;

  var isFinite = value => typeof value === 'number' && value < Infinity && value > -Infinity;

  var isFunction = value => typeof value == 'function';

  var isInteger = value => Number.isInteger(value);

  var isLength = value => Number.isInteger(value);

  var isMap = value => Object.prototype.toString.call(value) === "[object Map]";

  var isMatch = (object,source) => {
    if(object === source) return true;

    var [prop, val] = Object.entries(source)[0]

    return object[prop] === val;
  };

  var isMatchWith = (object, source, customiser) => {
    let [prop, val] = Object.entries(source)[0];
    return Boolean(customiser(object[prop], val));
  };

  var isNaN = value => {
        return typeof value === "object" && window.isNaN(value) || typeof value === "number" && window.isNaN(value);   
  };
  
  var isNative = value => {};

  var isNil = value => value === null || value === undefined;

  var isNull = value => value === null;

  var isNumber = value => Object.prototype.toString.call(value) === '[object Number]';

  var isObject = value => value !== null && typeof value === 'object' || typeof value === 'function';

  var isObjectLike = value => value !== null && typeof value === 'object';

  var isPlainObject = value => value.__proto__ === Object.prototype;

  var isRegExp = value => Object.prototype.toString.call(value) === "[object RegExp]";

  var isSafeInteger = value => typeof value === 'number' && value >= Number.MIN_SAFE_INTEGER && value <= Number.MAX_SAFE_INTEGER && Number.isInteger(value);

  var isSet =value => Object.prototype.toString.call(value) === '[object Set]';

  var isString = value => typeof value === 'string';

  var isSymbol = value => typeof value === 'symbol';

  var isTypedArray =  value => /\[object\s.+Array\]/.test(Object.prototype.toString.call(value));

  var isUndefined = value => typeof value === 'undefined';

  var isWeakMap = value => Object.prototype.toString.call(value) === '[object WeakMap]';

  var isWeakSet = value => Object.prototype.toString.call(value) === '[object WeakSet]';

return {
    chunk: chunk,
    
    compact: compact,

    concat: concat,

    difference: difference,

    isArguments: isArguments,

    isArray: isArray,

    isArrayBuffer: isArrayBuffer,

    isArrayLike: isArrayLike,

    isBoolean: isBoolean,

    isDate: isDate,

    isElement: isElement,

    isEmpty: isEmpty,

    isError: isError,

    isFinite: isFinite,

    isFunction: isFunction,

    isInteger: isInteger,

    isLength: isLength,

    isMap: isMap,

    isMatch: isMatch,

    isMatchWith: isMatchWith,

    isNaN: isNaN,

    isNil: isNil,

    isNull: isNull,

    isNumber: isNumber,

    isObject: isObject,

    isObjectLike: isObjectLike,

    isPlainObject:isPlainObject,

    isRegExp: isRegExp,

    isSafeInteger: isSafeInteger,

    isSet: isSet,

    isString: isString,

    isSymbol: isSymbol,

    isTypedArray: isTypedArray,

    isUndefined: isUndefined,

    isWeakMap: isWeakMap,

    isWeakSet: isWeakSet,

    drop: drop,

    dropRight: dropRight,

    fill: fill,

    head: head,

    flatten: flatten,
    
    flattenDeep: flattenDeep,


}


}()