var hohenheimsd = function (){

  //_.chunk(array, [size=1])  
  //Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
  var chunk = (array, size = 1) => {
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
  var difference = (array, ...values) =>{
    var valArr = [].concat(...values);
    return array.filter(x => !valArr.includes(x));
  };


  //_.differenceBy(array, [values], [iteratee=_.identity]) 
  var differenceBy = (array, values, iteratee = hohenheimsd.identity) =>{
    let detector = hohenheimsd.iteratee(iteratee);                       
    values = values.map(x => detector(x));
    
    return array.filter(x => !values.includes(detector(x)));
  };

  //_.differenceWith(array, [values], [comparator])
  var differenceWith = (array, values, comparator) => array.filter(item => !values.some(it => comparator(it,item)));

  // _.drop(array, [n=1])  Creates a slice of array with n elements dropped from the beginning.
  var drop = (value, n = 1) => value.slice(n);

  //_.dropRight(array, [n=1]) Creates a slice of array with n elements dropped from the end.
  var dropRight = (value, n = 1) => (value.length - n) <= 0 ? value.slice(0,0) : value.slice(0,value.length - n);

  //_.dropRightWhile(array, [predicate=_.identity])
  //a.reduceRight((accumulator,currentValue)=> (accumulator && currentValue != 4 && a.pop() ,accumulator && currentValue != 4 ? true : false), true);

  var dropRightWhile = (array, predicate = hohenheimsd.identity) => {
    let detector = hohenheimsd.iteratee(predicate); 
    var array2 = Array.from(array);
    array2.reduceRight((accumulator,currentValue)=> (accumulator && detector(currentValue) && array2.pop() ,accumulator && detector(currentValue) ? true : false), true);
    return array2;
  };

  // _.fill(array, value, [start=0], [end=array.length]) Fills elements of array with value from start up to, but not including, end.
  var fill = (array, value, start = 0, end = array.length) => array.fill(value, start, end);


  //_.findIndex(array, [predicate=_.identity], [fromIndex=0])
  var findIndex = (array, predicate = hohenheimsd.identity, fromIndex = 0) => {
    let detector = hohenheimsd.iteratee(predicate); 
    for(let i = fromIndex; i < array.length; i++) {
      if (detector(array[i])) return i;
    }
  };

  //_.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])
  //This method is like _.findIndex except that it iterates over elements of collection from right to left.
  var findLastIndex = (array, predicate = hohenheimsd.identity, fromIndex = array.length-1) => {
    let detector = hohenheimsd.iteratee(predicate); 
    for(let i = fromIndex; i >= 0; i--) {
      if (detector(array[i])) return i;
    }
  };

  //_.fromPairs(pairs) 
  var fromPairs = value => value.reduce((accumulator, currentValue) => (accumulator[currentValue[0]] = currentValue[1],accumulator), {});

  //_.head(array)
  var head = value => value[0];

  //_.flatten(array) Flattens array a single level deep.
  var flatten = value => value.reduce((accumulator,currentValue) => accumulator.concat(currentValue),[]);

  //_.flattenDeep(array) Recursively flattens array.
  var flattenDeep = value => {
    var array = [];
    var flattenDeep2 = value =>{
      for(var i of value){
        if(isArray(i)){
          flattenDeep2(i);
        }else {
          array.push(i);
        }
      }
    }
    flattenDeep2(value);

    return array;
  };

  //_.flattenDepth(array, [depth=1]) Recursively flatten array up to depth times.
  var flattenDepth = (array, depth=1) => {

    if (depth === 0) return array;
    //每层创建一个空数组逐个concat
    return flattenDepth(array.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []), --depth); 

    //另外一种写法 
    /*
    var p = [];
    depth++;
    var flattenDeep2 = (value,deep) =>{
      if(deep === depth) {
        p.push(value);                
        return;                           //层数够的时候push后返回
      } 
      for(var i of value){
        if(isArray(i)){
          flattenDeep2(i,++deep);
        }else {
          p.push(i);
        }
      }
    }
    flattenDeep2(array,0);
    return p;
     */
  }; 


  var reduce = (ary, reducer, initialValue) => (ary.forEach(x => initialValue = reducer(x, initialValue)),initialValue);
    
  var filter = (ary, test) => ary.reduce((accumulator,currentValue)=> test(currentValue) ? (accumulator.push(currentValue),accumulator) : accumulator , []);

  //_.indexOf(array, value, [fromIndex=0])
  var indexOf = (array, value, index = 0) => index < 0 ?  array.indexOf(value, array.length + index - 1) : array.indexOf(value,index) ;

  //_.initial(array) Gets all but the last element of array.
  var initial = value => value.slice(0,value.length - 1);

  //_.intersection([arrays]) 
  //Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons. 
  //The order and references of result values are determined by the first array.
  
  //var intersection = (...value) => Array.from(value.reduce((accumulator,currentValue)=>new Set(currentValue.filter(x => accumulator.has(x))), (new Set(value[0]))));
  //升级版 支持大于二个数组 支持去重
  var intersection = (...value) => hohenheimsd.uniq(value.reduce((accumulator,currentValue) => accumulator.filter(x => currentValue.includes(x))));

  //_.intersectionBy([arrays], [iteratee=_.identity])
  //升级版 支持大于二个数组 支持去重
  var intersectionBy = (...value) => {

    var detector = hohenheimsd.iteratee(value.pop());

    return hohenheimsd.uniqBy(value.reduce((accumulator,currentValue) => {

      currentValue = currentValue.map(x => detector(x));

      return accumulator.filter(x => currentValue.includes(detector(x)));
    }), detector);
  }


  var uniq = value => Array.from(new Set(value));

  var uniqBy = (value ,iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);

    var array = [];

    value.forEach(x => {
      array.some(y => detector(y) === detector(x)) ? array : (array.push(x),array);
    });

    return array;
  };


  var negate = value => (...value2) => !value(...value2);


  //_.identity(value)
  var identity = value => value;

  var iteratee = func => {
    if(isString(func)){       //如果是字符串就判断对象的属性
      return function (obj){
        return obj[func];
      }
    }

    if(isObjectLike(func)){
      if(isArray(func)){      //如果是数组就转变为对象去判断
        return function (obj){
          return isMatch(obj, fromPairs([func])); 
        }
      }
      return function(obj) {    //如果是对象就直接用isMatch对比判断
        return isMatch(obj,func);
      }
    }

    if(isFunction(func)){     //如果是函数 直接返回
      return func;
    }

    return function () {
      return false;
    }

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

  //_.isEqual(value, other) Performs a deep comparison between two values to determine if they are equivalent.

  var isEqual = (value, other) => {
    let type1 = Object.prototype.toString.call(value).slice(8, -1);
    let type2 = Object.prototype.toString.call(other).slice(8, -1);

    if (type1 !== type2) return false;

    if (isNaN(value) && isNaN(other)) return true;

    if (value === other) return true;

    if (type1 === 'String' || type1 === 'Number' || type1 === 'Bool' || type1 === 'Date')  {
       return value.valueOf() === other.valueOf() ? true : false;
    }

    if (type1 === 'Map' || type1 === 'Set') {
      value = Array.from(value);
      other = Array.from(other);
      type1 = 'Array';
    }

    if (type1 === 'Array' || type1 === 'Object') {
      let keys1 = Object.keys(value);
      let keys2 = Object.keys(other);
      if (keys1.length !== keys2.length) return false;  
      return keys1.every(key => isEqWith(value[key], other[key]));
    }

    return value === other;
  };

  var isError = value => value instanceof Error;

  var isFinite = value => typeof value === 'number' && value < Infinity && value > -Infinity;

  var isFunction = value => typeof value == 'function';

  var isInteger = value => Number.isInteger(value);

  var isLength = value => Number.isInteger(value);

  var isMap = value => Object.prototype.toString.call(value) === "[object Map]";

  var isMatch = (object,source) => hohenheimsd.isEqual(object[Object.keys(source)[0]],Object.values(source)[0]);

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

    differenceBy: differenceBy,

    differenceWith: differenceWith,

    drop: drop,

    dropRight: dropRight,

    dropRightWhile: dropRightWhile,

    fill: fill,

    findIndex: findIndex,

    findLastIndex: findLastIndex,

    head: head,

    flatten: flatten,

    flattenDeep: flattenDeep,

    flattenDepth: flattenDepth,

    fromPairs: fromPairs,

    indexOf: indexOf,

    initial: initial,

    intersection: intersection,

    intersectionBy: intersectionBy,
    
    uniq: uniq,

    uniqBy: uniqBy,





    identity: identity,

    iteratee: iteratee,








    isArguments: isArguments,

    isArray: isArray,

    isArrayBuffer: isArrayBuffer,

    isArrayLike: isArrayLike,

    isBoolean: isBoolean,

    isDate: isDate,

    isElement: isElement,

    isEmpty: isEmpty,

    isEqual: isEqual,

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

    negate: negate,

}


}()