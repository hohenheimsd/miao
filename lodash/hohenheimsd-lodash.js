var hohenheimsd = function (){


  //将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
  function chunk (array, size = 1) {
    var arr = [];
    var i = 0;
    while(i < array.length){
      arr.push(array.slice(i,i + size));
      i+=size;
    }
    return arr;
  }
  //创建一个新数组，包含原数组中所有的非假值元素。例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。
  var compact = array=>array.filter(array=>array);

  //创建一个array与任何其他数组和/或值连接的新数组。

  var concat = (array,...nums)=> array.concat(...nums);


  // difference(array, [values]) this method returns a new array.

  var difference = function(array,values){

    var valArr = [].concat(...values);

    return array.filter(x=>!valArr.includes(x));

  };


  //_.differenceBy(array, [values], [iteratee=_.identity])

  var differenceBy = function(array,values,iterate){

  }





  var isArguments =  value => Object.prototype.toString.call(value) === '[object Arguments]';

  var isArray =  value => Object.prototype.toString.call(value) === '[object Array]';

  var isArrayBuffer = value => Object.prototype.toString.call(value) === '[object ArrayBuffer]';

  var isArrayLike = value => value.length ? (typeof value != 'string' && typeof value != 'function' && typeof value.length == 'number' && value.length >= 0 && value.length < 2**32) : false;

  var isBoolean = value => typeof value === 'boolean';

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

  var isMap = value => Object.prototype.toString.call(value) === "[object Map]";

  var isMatch = (object,source) => {
    if(object === source) return true;
    var key = Object.keys(source)[0];
    var val = Object.values(source)[0];
    if(key in object && val == object[key]){
      return true;
    } else {
      return false;
    }
  };



return {
    chunk: chunk,
    
    compact: compact,

    concat: concat,

    difference: difference,

    differenceBy: differenceBy,

    isArguments: isArguments,

    isArray: isArray,

    isArrayBuffer: isArrayBuffer,

    isArrayLike: isArrayLike,

    isBoolean: isBoolean,

    isDate: isDate,

    isElement: isElement,

    isEmpty: isEmpty,

    isMatch: isMatch,

    isError: isError,

    isFinite: isFinite,

    isFunction: isFunction,

    isInteger: isInteger,

    isMap: isMap,





}


}()