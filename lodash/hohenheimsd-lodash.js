var hohenheimsd = function (){
  var res;
  //_.chunk(array, [size=1])  
  //Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.
  //

  // Array
  // 
  // 
  // 
  // 
  // 
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
  var compact = array => array.filter(array => array);

  //_.concat(array, [values])  Creates a new array concatenating array with any additional arrays and/or values.
  var concat = (array,...nums) => array.concat(...nums);

  // difference(array, [values]) this method returns a new array.
  var difference = (array, ...values) =>{
    var valArr = [].concat(...values);
    return array.filter(x => !valArr.includes(x));
  };

  //_.differenceBy(array, [values], [iteratee=_.identity]) 
  var differenceBy = (array, ...values) => { 
    if(hohenheimsd.isString(values[values.length - 1]) || hohenheimsd.isFunction(values[values.length - 1])) {
      var detector = hohenheimsd.iteratee(values.pop());     
    }else {
      var detector = hohenheimsd.identity;
    }
    
    values = [].concat(...values).map(x => detector(x));
    
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
    array2.reduceRight((accumulator,currentValue)=> (accumulator && detector(currentValue) && array2.pop() ,accumulator && detector(currentValue)), true);
    return array2;
  };

  //dropWhile不能使用dropRightWhile的方法
  var dropWhile = (array, predicate = hohenheimsd.identity) => {
    let detector = hohenheimsd.iteratee(predicate); 
    return array.slice(array.findIndex(x => !detector(x)));
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
  //var flatten = value => value.reduce((accumulator,currentValue) => accumulator.concat(currentValue),[]);
  ///var flatten = value => [].concat(...value);
  var flatten = [].concat.apply.bind([].concat, []);

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
    //return flattenDepth(array.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []), --depth); 
    return flattenDepth([].concat(...array), --depth); 

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

  //_.indexOf(array, value, [fromIndex=0])
  var indexOf = (array, value, index = 0) => index < 0 ?  array.indexOf(value, array.length + index - 1) : array.indexOf(value,index);

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

  //升级版 支持大于二个数组 暂不支持去重
  var intersectionWith = (...value) => {

    var comparator = value.pop();

    return value.reduce((accumulator,currentValue) => accumulator.filter(x => currentValue.some(y => comparator(x,y))));

  }

  var join = (array, separator = ',') => array.join(separator);

  var last = array => array[array.length - 1];

  var lastIndexOf = (array, value, fromIndex=array.length-1) => array.lastIndexOf(value, fromIndex);

  var nth = (array, n = 0) => n < 0 ? array[array.length+n] : array[n];

  //this method mutates array 不用filter 原地修改
  var pull = (array, ...values) => {

    //从后往前删
    var len = array.length;
    for (var i = len - 1; i >= 0; i--){
      if(values.includes(array[i])) array.splice(i,1);
    }
    return array;



    /*
    //从前往后删的方法
    //values去重
    values = hohenheimsd.uniq(values);
    var tmp = [];
    var count = 0;
    array.forEach((item, index)=>{
      if(values.includes(item)){
        tmp.push(index);
        count++;
      }else{
        if(tmp.length !== 0){
            array[tmp.shift()] = item;
            tmp.push(index);   
        }
      }
    });
    array.length -= count;

    return array;
    */
  };

  var pullAll = (array, values) => {
    var len = array.length;
    for (var i = len - 1; i >= 0; i--){
      if(values.includes(array[i])) array.splice(i,1);
    }
    return array;



    /*
    //values去重
    values = hohenheimsd.uniq(values);
    var tmp = [];
    var count = 0;
    array.forEach((item, index)=>{
      if(values.includes(item)){
        tmp.push(index);
        count++;
      }else{
        if(tmp.length !== 0){
            array[tmp.shift()] = item;
            tmp.push(index);   
        }
      }
    });

    array.length -= count;
    return array;
    */

  };

  var pullAllBy = (array, values, iteratee = hohenheimsd.identity) => {

    var detector = hohenheimsd.iteratee(iteratee);
    var values = values.map(x => detector(x));
    var len = array.length;
    for (var i = len - 1; i >= 0; i--){
      if(values.includes(detector(array[i]))) array.splice(i,1);
    }
    return array;

    /*
    var tmp = [];
    var count = 0;
    array.forEach((item, index)=>{
      if(values.includes(detector(item))){
        tmp.push(index);
        count++;
      }else{
        if(tmp.length !== 0){
            array[tmp.shift()] = item;
            tmp.push(index);   
        }
      }
    });

    array.length -= count;
    return array;
    */
  };

  var pullAllWith = (array, values, comparator) => {

    var detector = hohenheimsd.iteratee(iteratee);
    var len = array.length;
    for (var i = len - 1; i >= 0; i--){
      if(values.some(x => comparator(x, array[i]))) array.splice(i,1);
    }
    return array;

    /*
    var tmp = [];
    var count = 0;
    array.forEach((item, index)=>{
      if(values.some(x => comparator(x,item))){
        tmp.push(index);
        count++;
      }else{
        if(tmp.length !== 0){
            array[tmp.shift()] = item;
            tmp.push(index);   
        }
      }
    });

    array.length -= count;
    return array;
    */
  }

  var pullAt = (array, indexes) => {
    //indexes去重排序
    indexes = hohenheimsd.uniq(indexes).sort((x,y)=>x-y);
    var res = [];
    var len = indexes.length;
    for (var i = len - 1; i >= 0; i--){
      res.unshift(array.splice(indexes[i],1)[0]);
    }
    return res;


    /*
    //indexes去重
    indexes = hohenheimsd.uniq(indexes);
    var tmp = [];
    var count = 0;
    var removes = [];
    array.forEach((item, index)=>{
      if(indexes.includes(index)){
        removes.push(item);
        tmp.push(index);
        count++;
      }else{
        if(tmp.length !== 0){
            array[tmp.shift()] = item;
            tmp.push(index);   
        }
      }
    });

    array.length -= count;

    return removes;
    */
  };

  var remove = (array, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    var len = array.length;
    var res = [];
    for (var i = len - 1; i >= 0; i--){
      if(detector(array[i])) res.unshift(array.splice(i,1)[0]);
    }
    return res;
  };

  var reverse = array => array.reverse();

  var slice = (array, start = 0, end = array.length) => array.slice(start, end);

  var sortedIndex = (array, value) => {
    var index = array.findIndex(item => item >= value); 
    return index === -1 ? array.length : index;
  };

  var sortedIndexBy = (array, value, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    var index = array.findIndex(item => detector(item) >= detector(value)); 
    return index === -1 ? array.length : index;
  };

  var sortedIndexOf = (array, value) => {
    var len = array.length;
    if (array[0] > value || array[len - 1] < value) return -1
    var left = 0;
    var right = len - 1;
    while(left <= right){
      var mid = (right + left) / 2 | 0;
      if(array[mid] === value){
        while(array[mid] === value){
          mid--;
        }
        return ++mid;
      }else if(array[mid] > value){
        right = --mid; 
      } else {
        left = ++mid;
      } 
    }

    return -1;
  };

  var sortedLastIndex = (array, value) => {
    var len = array.length;
    for(var i = len - 1; i>=0; i--){
      if(array[i] <= value) return ++i;
    }
    return 0;
  };

  var sortedLastIndexBy = (array, value, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    var len = array.length;
    for(var i = len - 1; i>=0; i--){
      if(detector(array[i]) <= detector(value)) return ++i;
    }
    return 0;
  };

  var sortedLastIndexOf = (array, value) => {
    var len = array.length;
    if (array[0] > value || array[len - 1] < value) return -1
    var left = 0;
    var right = len - 1;
    while(left <= right){
      var mid = (right + left) / 2 | 0;
      if(array[mid] === value){
        while(array[mid] === value){
          mid++;
        }
        return --mid;
      }else if(array[mid] > value){
        right = --mid; 
      } else {
        left = ++mid;
      } 
    }

    return -1;
  };

  var sortedUniq = value => hohenheimsd.uniq(value).sort((x,y)=>x-y);

  var sortedUniqBy = (value, iteratee) => hohenheimsd.uniqBy(value, iteratee).sort((x,y)=>x-y);

  var tail = array => array.slice(1);

  var take = (array, n = 1) => array.slice(0, n);

  var takeRight = (array, n = 1) => n >= array.length ? array.slice() : array.slice(array.length - n);

  var takeRightWhile = (array, predicate = hohenheimsd.identity) => {
    let detector = hohenheimsd.iteratee(predicate); 
    let res = [];
    array.reduceRight((accumulator,currentValue)=> (accumulator && detector(currentValue) && res.unshift(currentValue) ,accumulator && detector(currentValue)), true);
    return res;
  };

  var takeWhile = (array, predicate = hohenheimsd.identity) => {
    let detector = hohenheimsd.iteratee(predicate); 
    return array.slice(0, array.findIndex(x => !detector(x)));
  }

  var union = (...arrays) => hohenheimsd.uniq([].concat(...arrays));

  var unionBy = (...arrays) => {
    var iteratee = arrays.pop();
    return hohenheimsd.uniqBy([].concat(...arrays),iteratee);
  }

  var unionWith = (...arrays) => {
    var comparator = arrays.pop();
    return hohenheimsd.uniqWith([].concat(...arrays),comparator);
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

  var uniqWith = (value, comparator) => {

    var array = [];

    value.forEach(x => {
      array.some(y => comparator(x, y)) ? array : (array.push(x),array);
    });

    return array;

  };

  var unzip = array =>  (res = Array(array[0].length).fill(0).map(x => []), res.forEach((item, index)=> array.forEach( it => item.push(it[index]))), res);

  var unzipWith = (array, iteratee = hohenheimsd.identity) => {

    var detector = hohenheimsd.iteratee(iteratee);

    var array = hohenheimsd.unzip(array);

    array = array.map(item => item.reduce((accumulator,currentValue)=> detector(accumulator, currentValue)));

    return array;
  };

  var without = (array, ...values) => array.filter(x => !values.includes(x));

  var xor = (...arrays) => {
    var res = [].concat(...arrays);

    var map = res.reduce((accumulator, currentValue) => (accumulator[currentValue]++ || (accumulator[currentValue] = 1), accumulator), {});

    return res.filter(item => !(map[item] != 1));
  };

  var xorBy = (...arrays) => {

    var detector = hohenheimsd.iteratee(arrays.pop());

    var res = [].concat(...arrays);

    var map = res.reduce((accumulator, currentValue) => (accumulator[detector(currentValue)]++ || (accumulator[detector(currentValue)] = 1), accumulator), {});
    
    return res.filter(item => !(map[detector(item)] != 1));
  };

  var xorWith = (...arrays) => {
    var comparator = hohenheimsd.iteratee(arrays.pop());
    return arrays.reduce((accumulator, currentValue) => {
      accumulator2 = accumulator.filter(item => !currentValue.some(it => comparator(item, it)));
      currentValue2 = currentValue.filter(item => !accumulator.some(it => comparator(item, it)));
      accumulator2 = accumulator2.concat(currentValue2);
      return accumulator2;
    });
  };

  var zip = (...arrays) => (res = Array(arrays[0].length).fill(0).map(x => []), res.forEach((item, index)=> arrays.forEach( it => item.push(it[index]))), res);

  var zipObject = (props, values) => props.reduce((obj, key, index)=>(obj[key] = values[index], obj),{});

  //var zipObjectDeep = (props, values) => 

  //Function
  //
  //
  //
  //
  //
  //
  //

  var countBy =  (collection, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    collection = Object.entries(collection);
    return collection.reduce((accumulator, currentValue)=> (++accumulator[detector(currentValue[1])] || (accumulator[detector(currentValue[1])] = 1), accumulator) ,{});
  };

  var forEach = (collection, iteratee = hohenheimsd.identity) => {
    var eacher = hohenheimsd.iteratee(iteratee);
    array = Object.entries(collection);
    for (let [index, val] of array){
      if(eacher(val, index, array) === false) break;
    }
    return collection;

  };

  var forEachRight = (collection, iteratee = hohenheimsd.identity) => {
    var eacher = hohenheimsd.iteratee(iteratee);
    array = Object.entries(collection);
    var len = array.length;
    for (var i = len - 1; i >= 0; i--){
      if(eacher(array[i][1], array[i][0], array) === false) break;
    }
    return collection;
  };



  var find = (collection, predicate = hohenheimsd.identity, fromIndex = 0) => {
    var detector = hohenheimsd.iteratee(predicate);
    var result;
    hohenheimsd.forEach(collection.slice(fromIndex), item => detector(item) ? ((result = item), false) : true);
    return result;    
  };

  var findLast = (collection, predicate = hohenheimsd.identity, fromIndex = collection.length - 1) => {
    var detector = hohenheimsd.iteratee(predicate);
    var result;
    hohenheimsd.forEachRight(collection.slice(0, fromIndex + 1), item => detector(item) ? ((result = item), false) : true);
    return result;    
  };

  var flatMap = (collection, iteratee = hohenheimsd.identity) => {

    var detector = hohenheimsd.iteratee(iteratee);
    
    return Array.from(collection).reduce((accumulator,currentValue) => accumulator.concat(detector(currentValue)) ,[]);    
    
  }

  var flatMapDeep = (collection, iteratee = hohenheimsd.identity) => {
    collection = hohenheimsd.flatMap(collection, iteratee);

    return hohenheimsd.flattenDeep(collection);
  };

  var flatMapDepth = (collection, iteratee = hohenheimsd.identity, depth = 1) =>{
    collection = hohenheimsd.flatMap(collection, iteratee);

    return hohenheimsd.flattenDepth(collection, depth - 1);
  };

  var reduce = function (collection, reducer = hohenheimsd.identity , accumulator){
    reducer = hohenheimsd.iteratee(reducer);
    collection = Object.entries(collection);
    for (let i in collection){ 
      if(i == 0 && (arguments.length < 3)){
        accumulator = collection[0][1];
        continue;
      }
      accumulator = reducer(accumulator,collection[i][1],collection[i][0],collection);
    }
    return accumulator;
  };

  var includes = (collection, value, fromIndex = 0) => {
    if(hohenheimsd.isObjectLike(collection)) collection = Object.values(collection);

    return collection.includes(value, fromIndex);

  };

  var invokeMap = (collection, path, ...args) => {
    var fnc = hohenheimsd.isString(path) ? collection[0][path] : path;

    return Object.values(collection).map(item => fnc.apply(item, args));
  };

  var map = (collection, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);

    return Object.values(collection).map((item, index, array) => detector(item, index, array));
  };


  //var orderBy = (collection, iteratees = hohenheimsd.identity, orders) => {};



  //var reduce = (ary, reducer, initialValue) => initialValue !== undefined ? (ary.forEach((currentValue, index, array) => initialValue = reducer(initialValue, currentValue, index, array)),initialValue) : 1 ; 
  var filter = (ary, test) =>  {
    var test = hohenheimsd.iteratee(test);

    return ary.reduce((accumulator,currentValue)=> test(currentValue) ? (accumulator.push(currentValue),accumulator) : accumulator, []);
  };


  var keyBy = (ary , key) => {
    key = hohenheimsd.iteratee(key);
    return ary.reduce((x,y)=> (x[key(y)] = y, x),{});
  };

  var groupBy = (collection, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    return collection.reduce((result,item)=> (result[detector(item)] ? result[detector(item)].push(item): result[detector(item)] = [item], result) ,{});
  };

  var partition = (collection, predicate = headohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(predicate);
    var falseGroup = [];
    var res = [];
    res.push(collection.filter(item => detector(item) || (falseGroup.push(item), false)));
    res.push(falseGroup);
    return res;
  };

  var reduceRight = function (collection, reducer = hohenheimsd.identity , accumulator){
    reducer = hohenheimsd.iteratee(reducer);
    collection = Object.entries(collection);
    var len = collection.length;
    for (let i = len - 1; i >=0 ; i--){ 
      if(i == len - 1 && (arguments.length < 3)){
        accumulator = collection[len - 1][1];
        continue;
      }
      accumulator = reducer(accumulator,collection[i][1],collection[i][0],collection);
    }
    return accumulator;
  };

  var reject = (collection, predicate = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(predicate);

    return collection.reduce((accumulator,currentValue)=> detector(currentValue) ? accumulator : (accumulator.push(currentValue),accumulator) , []);
  };

  var sample = collection => {
    var values = Object.values(collection);
    return values[Math.random()*(values.length - 1) | 0]; 
  }

  var sampleSize = (collection, n = 1) => {
    var values = Object.values(collection);

    if(n > values.length) n = values.length;

    return new Array(n).fill(0).map(() => values.splice(Math.random() * values.length, 1).pop());
  };

  var shuffle = collection => hohenheimsd.sampleSize(collection, Infinity); 

  var size = collection => hohenheimsd.isObjectLike(collection) ? Object.values(collection).length : collection.length;

  var every = (collection, predicate = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(predicate);

    collection = Object.values(collection);

    return !collection.some(hohenheimsd.negate(detector));
  };

  var some = (collection, predicate = hohenheimsd.identity) => {

    var detector = hohenheimsd.iteratee(predicate);

    collection = Object.values(collection);

    return collection.some(detector); 
  };

  var sortBy = (collection, iteratees = hohenheimsd.identity) =>  {
    let predicates = iteratees.map(it => hohenheimsd.iteratee(it)).reverse();
    let values = Object.values(collection);
    predicates.forEach(predicate => {
      values.sort((a, b) => {
        if (predicate(a) < predicate(b)) return -1;
        else if (predicate(a) > predicate(b)) return 1;
        else return 0;
      })
    })
    return values;
  }

  var after = (n, func) => (...arg) => n <= 0 ? func(...arg) : (--n,undefined);

  var ary = (func ,n = func.length) => (...arg) => func(...(arg.length = n,arg));

  var before = (n, func) => (...arg) => n <= 0 ? (--n,undefined) : func(...arg);

  var unary = func => hohenheimsd.ary(func, 1);

  var flip = func => (...arg) => func(...arg.reverse());

  var negate = value => (...value2) => !value(...value2);

  var spread = func => arg => func.apply(null, arg);

  var bind = (f, thisArg, ...fixedArgs) => (...arg) => f.call(thisArg,...fixedArgs,...arg);

  var defer =  (func, ...args) => setTimeout(func, 0, ...args);

  var delay = (func, wait, ...args) => setTimeout(func, wait, ...args);


  //Lang
  //
  //
  //
  //

  var castArray = value => hohenheimsd.isArray(value) ? value : hohenheimsd.isUndefined(value) ? [] : [value];

  var cloneDeep = value => JSON.parse((JSON.stringify(value)));

  var conformsTo = (object, source) => hohenheimsd.iteratee(Object.values(source)[0])(object[Object.keys(source)[0]]); 

  var eq = (value, other) => (value !== value && other !== other) || value === other;

  var gt = (value, other) => value > other;

  var gte = (value, other) => value >= other;

  var lt = (value, other) => value < other;

  var lte = (value, other) => value <= other;

  var toArray = value => hohenheimsd.isNil(value) ? [] : Object.values(value);

  var toFinite = value => Number(value) > Number.MAX_VALUE ? Number.MAX_VALUE : Number(value) < Number.MIN_VALUE ? Number.MIN_VALUE : Number(value);

  var toInteger = value => Number(value) > Number.MAX_VALUE ? Number.MAX_VALUE : Number(value) | 0;

  var toLength = value => Number(value) > Number.MAX_VALUE ? 2**32-1 : Number(value) | 0;

  var toNumber = value => Number(value);

  var toSafeInteger = value => Number(value) > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Number(value) < Number.MIN_SAFE_INTEGER ? Number.MIN_SAFE_INTEGER : Number(value) | 0;

  var toString = value => hohenheimsd.isNil(value) ? '' : value.toString();            

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

    if (value !== value && other !== other) return true;

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
      return keys1.every(key => isEqual(value[key], other[key]));
    }

    return value === other;
  };

  var isError = value => value instanceof Error;

  var isFinite = value => typeof value === 'number' && value < Infinity && value > -Infinity;

  var isFunction = value => typeof value == 'function';

  var isInteger = value => Number.isInteger(value);

  var isLength = value => Number.isInteger(value);

  var isMap = value => Object.prototype.toString.call(value) === "[object Map]";

  var isMatch = (object,source) => {
    for(var key in source){
      if(!hohenheimsd.isEqual(object[key],source[key])) return false;
    }
    return true;
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


  //Math
  //
  //
  //

  var add = (augend, addend) => augend + addend;

  var ceil = (number, precision = 0) => Math.ceil(number * (10 ** precision)) / (10 ** precision);

  var divide = (dividend, divisor) => dividend / divisor;

  var floor = (number, precision = 0) => Math.floor(number * (10 ** precision)) / (10 ** precision);

  var max = array => array && array.length ? Math.max(...array) : undefined;

  var maxBy = (array, iteratee = hohenheimsd.identity) => {
    return hohenheimsd.sortBy(array, [iteratee]).pop();    
  };

  var mean = array => array.reduce((mean, item, index) => (index * mean + item) / (index + 1));

  var meanBy = (array, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    return array.reduce((mean, item, index) => (index * mean + detector(item)) / (index + 1), detector(array[0]));
  };

  var min = array => array && array.length ? Math.min(...array) : undefined;

  var minBy = (array, iteratee = hohenheimsd.identity) => {
    return hohenheimsd.sortBy(array, [iteratee]).shift();    
  };

  var multiply = (multiplier, multiplicand) => multiplier * multiplicand;

  var round = (number, precision = 0) => Math.round(number * (10 ** precision)) / (10 ** precision);

  var subtract = (minuend, subtrahend) => minuend - subtrahend;

  var sum = value => sumBy(value);

  var sumBy = (value, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    return value.reduce((accumulator,currentValue)=> accumulator + detector(currentValue),0);
  };


  //Number
  //
  //
  

  //比最大的大的话返回最大 比最小的小返回最小 在中间 返回自己
  var clamp = (number, lower, upper) => number > upper ? upper : number < lower ? lower : number;

  var inRange = function (number, start, end) {
    if(arguments.length === 2){
      end = start;
      start = 0;
    }
    if(end < start){
      [end, start] = [start, end];
    }

    return number < end && number >= start;
  };

  var random = function (lower=0, upper=1, floating){
    if (upper === 1 && lower !== 0) {
      upper = lower;
      lower = 0;
    }
    if (!floating) {
      return Math.random() * (upper - lower) + lower;
    } else {
      lower = Math.ceil(lower);
      upper = Math.floor(upper);
      return Math.floor(Math.random() * (upper - lower) + lower);
    }
  };  

  //Object 
  //
  //
  //
  //
  
  var assign = (object, ...sources) => sources.reduce((accumulator, currentValue) => (hohenheimsd.forEach(currentValue, (value, key) => accumulator[key] = value), accumulator) ,object);

  var assignIn = (object, ...sources) => sources.reduce((accumulator, currentValue) => {

    for(var key in currentValue){

      accumulator[key] = currentValue[key];

    }
    return accumulator;

  } ,object);

  var defaults = (object, ...sources) => sources.reduce((accumulator, currentValue) => (hohenheimsd.forEach(currentValue, (value, key) => key in accumulator || (accumulator[key] = value)), accumulator) ,object);

  var defaultsDeep = (object, ...sources) => sources.reduce((accumulator, currentValue) => (hohenheimsd.forEach(currentValue, (value, key) => {key in accumulator ? hohenheimsd.isObject(value) && hohenheimsd.isObject(accumulator[key]) && (accumulator[key] = hohenheimsd.defaultsDeep(accumulator[key], value)) : accumulator[key] = value}), accumulator) ,object);

  var toPairs = object => Object.entries(object);

  var toPairsIn = object => {
    var res = [];
    for(var x in object){
      res.push([x, object[x]]);
    }
    return res;
  };

  var findKey = (object, predicate = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(predicate);
    var res = undefined;
    hohenheimsd.forEach(object, (value, key)=> detector(value) ? (res = key, false) : true);
    return res;
  }

  var findLastKey = (object, predicate = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(predicate);
    var res = undefined;
    hohenheimsd.forEachRight(object, (value, key)=> detector(value) ? (res = key, false) : true);
    return res;
  }

  var forIn = (object, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    for(var key in object){
      if(detector(object[key], key, object) === false) break;
    }
    return object;
  };

  var forInRight = (object, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    var keys = [];
    for(var key in object){
      keys.push(key);
    }
    var keys = keys.reverse();
    for(var key2 in keys){
      if(detector(object[key], key2, object) === false) break;
    }
    return object;
  };

  var forOwn = (object, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    var keys = Object.keys(object);
    for(var key in keys){
      if(detector(object[key], key, object) === false) break;
    }
    return object;
  };

  var forOwnRight = (object, iteratee = hohenheimsd.identity) => {

    var detector = hohenheimsd.iteratee(iteratee);
    var keys = Object.keys(object).reverse();
    for(var key in keys){
      if(detector(object[key], key, object) === false) break;
    }

    return object;

  };

  var functions = object => hohenheimsd.reduce(object, (res, value, key) => hohenheimsd.isFunction(value) ? (res.push(key), res) : res, []);

  var functionsIn = object => {
    var keys = [];
    for(var key in object){
      keys.push(key);
    }

    return keys.reduce((res, key) => hohenheimsd.isFunction(object[key]) ? (res.push(key), res) : res ,[]);
  };

  var has = (object, path) => {
    var pathArr = hohenheimsd.toPath(path);
    var value = object;
    var flag = true;
    hohenheimsd.forEach(pathArr, path => value.hasOwnProperty(path) ? (value = value[path], true) : (flag = false, false));
    return flag;
  };

  var hasIn = (object, path) => {
    var pathArr = hohenheimsd.toPath(path);
    var value = object;
    var flag = true;
    hohenheimsd.forEach(pathArr, path => path in value ? (value = value[path], true) : (flag = false, false));
    return flag;
  }

  var invert = object => hohenheimsd.reduce(object, (object, value, key) => (object[value] = key, object), {});

  var invertBy = (object, iteratee = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(iteratee);
    return hohenheimsd.reduce(object, (object, value, key) => (object[detector(value)] ? (object[detector(value)].push(key)) : (object[detector(value)] = [key]), object), {});
  };

  var invoke = (object, path, ...args) => {
    var pathArr = hohenheimsd.toPath(path);
    var func = pathArr.pop();
    return hohenheimsd.get(object, pathArr)[func](...args);
  };

  var keys = object => Object.keys(object);

  var keysIn = object => {

    var res = [];
    for (var key in object){
      res.push(key);
    }
    return res;

  }

  var mapKeys = (object, iteratee = hohenheimsd.identity) => {

    var detector = hohenheimsd.iteratee(iteratee);
    return hohenheimsd.reduce(object, (res, value, key, object)=>(res[detector(value, key, object)] = value, res), {});

  }

  var mapValues = (object, iteratee = hohenheimsd.identity) => {

    var detector = hohenheimsd.iteratee(iteratee);
    return hohenheimsd.reduce(object, (res, value, key, object)=>( res[key] = detector(value, key, object), res), {});

  }


  var merge = (object, ...sources) => hohenheimsd.mergeWith(object, ...sources);

  var mergeWith = (object, ...sources) => {
    var customiser = sources.pop();
    if(!hohenheimsd.isFunction(customiser)){
      sources.push(customiser);
      customiser = undefined;
    }
    var mergeWith2 = (object, ...sources) => {
      return sources.reduce((accumulator, currentValue) => (hohenheimsd.forEach(currentValue, (value, key) => {
        var val = object[key];
        if(customiser && customiser(val, value, key, object, currentValue)) {
          object[key] = customiser(val, value, key, object, currentValue);
          return;
        }
        if(hohenheimsd.isObject(val) && hohenheimsd.isObject(value)) {
          return mergeWith2(val, value);
        }
        object[key] = value;
      }), object), object);
    }

    return mergeWith2(object, ...sources);
  };

  var omit = (object, paths) => {
    var res = hohenheimsd.assign({}, object); 

    paths.forEach(path => {
      path = hohenheimsd.toPath(path);
      var property = path.pop(); 
      var obj = hohenheimsd.get(res, path);
      delete obj[property];
    })
    return res;

  };

  var omitBy = (object, predicate = hohenheimsd.identity) =>{
    var detector = hohenheimsd.iteratee(predicate);
    return hohenheimsd.reduce(object, (obj, value, key) => detector(value, key) ? obj : (obj[key] = value, obj), {});
  };

  var pick = (object, paths) => {
    var res = {};

    paths.forEach(path => {
      path = hohenheimsd.toPath(path);
      var property = path.pop();
      var obj = hohenheimsd.get(object, path);
      if(property in obj) {
        res[property] = obj[property];
      }
    })
    return res;
  };

  var pickBy = (object, predicate = hohenheimsd.identity) => {
    var detector = hohenheimsd.iteratee(predicate);
    return hohenheimsd.reduce(object, (obj, value, key) => detector(value, key) ? (obj[key] = value, obj) : obj, {});
  };


  var result = (object, path, defaultValue) => {

    var path = hohenheimsd.toPath(path);
    var result = hohenheimsd.get(object, path, defaultValue);
    var objectToBind = hohenheimsd.get(object, hohenheimsd.dropRight(path));

    return hohenheimsd.isFunction(result) ? result.call(objectToBind) : result;
  };

  var at = (object, ...paths) => hohenheimsd.flatten([].concat(...paths)).map(path => hohenheimsd.toPath(path)).map(pathItem => hohenheimsd.get(object, pathItem));

  var set = (object, path, value) => hohenheimsd.setWith(object, path, value);

  var setWith = (object, path, value, customiser) => {
    customiser = hohenheimsd.isFunction(customiser) ? customiser : undefined;
    var pathArr = hohenheimsd.toPath(path);
    pathArr.reduce((obj, path, index)=> {
      if(index < pathArr.length - 1){
        if(customiser){
          obj[path] = customiser(obj[path], path, obj);
        }else {
          obj[path] = hohenheimsd.isObject(obj[path]) ? obj[path] : isNaN(pathArr[index + 1]) ? {} : [];
        } 
      }else {
        obj[path] = value;
      }
      return obj[path];
    } 
    ,object)
    return object;
  };


  var transform = function (object, iteratee = hohenheimsd.identity, accumulator)  {
    var detector = hohenheimsd.iteratee(iteratee);
    collection = Object.entries(object);
    for (let i in collection){ 
      if(i == 0 && (arguments.length < 3)){
        accumulator = collection[0][1];
        continue;
      }
      if (detector(accumulator,collection[i][1],collection[i][0],object) === false ) break;
    }
    return accumulator;
  };

  var unset = (object, path) => {

    var path = hohenheimsd.toPath(path);
    var key = path.pop();
    object = hohenheimsd.get(object, path);
    if(key in object){
      delete object[key];
      return true;
    }else {
      return false;
    }

  };


  var update = (object, path, updater) => hohenheimsd.setWith(object, path, updater(hohenheimsd.get(object, path)));

  var updateWith = (object, path, updater, customiser) => hohenheimsd.setWith(object, path, updater(hohenheimsd.get(object, path)), customiser);

  var values = object => Object.values(object);

  var valuesIn = object => {
    var res = [];
    for(var i in object){
      res.push(object[i]);
    }
    return res;
  };

  var get = (object, path, defaultValue) => {
    var pathArr = hohenheimsd.toPath(path);

    var value;

    try {

      value = pathArr.reduce((accumulator, currentValue) => accumulator[currentValue] ,object);

    } catch (e) {

      return defaultValue;

    }
    return hohenheimsd.isUndefined(value) ? defaultValue : value;
  };

  

  var toPath = value => hohenheimsd.isArray(value) ? value : value.match(/([\w$]+)/g);

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


  //String
  //
  //

  var camelCase = (string = '') => {
    var words = hohenheimsd.words(string);
    return words.length === 1 ? words[0].toLowerCase() : (words.reduce( (accumulator, currentValue)=> accumulator + hohenheimsd.capitalize(currentValue),words.shift().toLowerCase()));
  };

  var capitalize = (string = '') => string[0].toUpperCase() + string.slice(1).toLowerCase();

  var words = (string = '', pattern) => hohenheimsd.isRegExp(pattern) ? string.match(pattern) : string.match(/[A-Z][a-z]+|[A-Z]+(?=[A-Z][a-z])|[a-z]+|[A-Z]+|\d+/g);


  //var deburr = () =>;
   
  var endsWith = (string='', target, position = string.length) => string[position - 1] === target;
   
  var escape = (string='') =>{
    var map = {
      '&+': '&amp;',
      '<+': '&lt;',
      '>+': '&gt;', 
      '"+': '&quot;',
      "'+": '&#39;',  // IE不支持&apos;
    };
    for(var i in map){
      string = string.replace(RegExp(i,'g'), map[i]);
    }
    return string;
  };
   
  function talkToChenJunQiao (...anywords) {  
    return '不是';
  }

  var escapeRegExp = (string='') => {
    var characters =  ["^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", "|"];
    for(var i of characters){
      string = string.replace(RegExp(`\\${i}+`,'g'),'\\' + i);
    }
    return string;
  };

  var kebabCase = (string='') => hohenheimsd.words(string).map(it=>it.toLowerCase()).join('-');

  var lowerCase = (string='') => hohenheimsd.words(string).map(it=>it.toLowerCase());  
   
  var lowerFirst = (string='') => string[0].toLowerCase() + string.slice(1);
  
  var pad = (string='', length=0, chars = ' ') => {
    if(length > string.length){
      var len = length - string.length;
      var left = '';
      var right = '';

      var leftLen = len / 2 | 0;
      var rightLen = len - leftLen;
      for(var i = 0; i < leftLen; i++){
        left += chars[i % chars.length];
      }
      for(var i = 0; i < rightLen; i++){
        right += chars[i % chars.length];
      }
    
      string = left + string + right;

    }
    return string;
  };  
  
  var padEnd = (string='', length=0, chars = ' ') =>{
    if(length > string.length){
      var len = length - string.length;
      var right = '';

      for(var i = 0; i < len; i++){
        right += chars[i % chars.length];
      }
      
      string = string + right;
    }
    return string;
  };
   
  var padStart = (string='', length=0, chars = ' ') =>{
    if(length > string.length){
      var len = length - string.length;
      var left = '';

      for(var i = 0; i < len; i++){
        left += chars[i % chars.length];
      }
      
      string = left + string;
    }
    return string;
  };
   
  var parseInt = (string, radix=10) => {

    var sum = 0,
    digits = '0123456789ABCDEF';
    var negative = false;
    if(string[0] === '-'){
      string = string.slice(1);
      negative = true;
    }

    string = string.replace(/^0+/,'');

    for(var i = string.length - 1,j = 0; i >= 0; i--,j++){
      sum += digits.indexOf(string[i]) * radix ** j; 
    }

    if (negative) return sum*(-1);
    return sum;

  };

  var repeat = (string='', n=1) => Array(n).fill(0).map(it => string).join('');

  function separateGroup (match){
        var group = [];
        for(var i = 1; i < match.length; i++){
          group.push(match[i]);
        }
        return group;
  }

  var replace = (string='', pattern, replacement) =>{
    if(hohenheimsd.isString(pattern)){
      var index = string.indexOf(pattern);
      if (hohenheimsd.isFunction(replacement)) {
        replacement = replacement(pattern, index, string);      
      }
      if(index !== -1){
        var left = string.slice(0, index);
        var right = string.slice(index + pattern.length);
        string =  left + replacement + right;
      }
      return string;

    }else if (hohenheimsd.isRegExp(pattern)) {
      var match = pattern.exec(string);
      var groupArr;
      if(!match) return string;

      groupArr = separateGroup(match);   //某次匹配的分组的数组
      var res;
      var leftString = string.slice(0, pattern.lastIndex)
      var rightString = string.slice(pattern.lastIndex);
      if(hohenheimsd.isString(replacement)){
        leftString = hohenheimsd.replace(leftString , match[0], groupArr.reduce((accumulator, currentValue, index)=> hohenheimsd.replace(accumulator, `$${index + 1}`, currentValue) ,replacement));
      }else {
        leftString = string.slice(0,match.index) + replacement(match[0] ,...groupArr, match.index, string);
      }
      
      if(pattern.global){
        pattern.lastIndex = 0;
        return leftString + hohenheimsd.replace(rightString, pattern, replacement);
      } else {
        return leftString + rightString;
      }

    }
  };

  var snakeCase = (string='') => hohenheimsd.words(string).map(it=>it.toLowerCase()).join('_');

  var split  = (string='', separator, limit) => string.split(separator, limit);

  var startCase = (string ='') => hohenheimsd.words(string).map(it=>it[0].toUpperCase() + it.slice(1)).join(' ');

  var startsWith = (string='', target, position=0) => string.slice(position, position + target.length) === target;

  var toLower = (string='') => string.toLowerCase();

  var toUpper = (string='') => string.toUpperCase();

  var trim = (string='', chars=' ') => string.replace(RegExp(`^[${chars}]+|[${chars}]+$` ,'gi'),'');

  var trimEnd = (string='', chars=' ') => string.replace(RegExp(`[${chars}]+$` ,'gi'),'');

  var trimStart = (string='', chars=' ') => string.replace(RegExp(`^[${chars}]+` ,'gi'),'');

  var truncate = (string='',options={length:30, omission:'...'}) => {
    if(options.length === undefined){
      options.length = 30;
    }
    if(options.omission === undefined){
      options.omission = '...';
    }
    var len = string.length;
    if(string.search(options.separator) >= 0 && options.separator){
      if(len > options.length){
        if(hohenheimsd.isString(options.separator)){
          var index = string.lastIndexOf(options.separator);
          if(index + options.omission.length > options.length){
            return string.slice(0,options.length).replace(RegExp(`[^]{${options.omission.length}}$`), options.omission);
          }else {
            return string.slice(0, index) + options.omission;
          }
        }else {
          var match;
          options.separator = RegExp(options.separator, /g/.test(options.separator.flags) ? options.separator.flags : options.separator.flags + 'g' );
          var index;
          while(match = options.separator.exec(string)){
            index = match.index;
          }
          if(index + options.omission.length > options.length){
            return string.slice(0,options.length).replace(RegExp(`[^]{${options.omission.length}}$`), options.omission);
          }else {
            return string.slice(0, index) + options.omission;
          }
        }
      }else {
        return string;
      }
    }else {
      if(len > options.length){
        return string.slice(0,options.length).replace(RegExp(`[^]{${options.omission.length}}$`), options.omission);
      }else {
        return string;
      }
    }
  };
  /*  
  
  
   
   
   
  var unescape = () =>;
   
  var upperCase = () =>;
   
  var upperFirst = () =>;
  */

return {

    //Array

    chunk: chunk,
    
    compact: compact,

    concat: concat,

    difference: difference,

    differenceBy: differenceBy,

    differenceWith: differenceWith,

    drop: drop,

    dropRight: dropRight,

    dropRightWhile: dropRightWhile,

    dropWhile: dropWhile,

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

    intersectionWith: intersectionWith,
    
    join: join,

    last: last,

    lastIndexOf: lastIndexOf,

    nth: nth,

    pull: pull,

    pullAll: pullAll,

    pullAllBy: pullAllBy,

    pullAllWith: pullAllWith,

    pullAt: pullAt,

    remove: remove,

    reverse: reverse,

    slice: slice,

    sortedIndex: sortedIndex, 

    sortedIndexBy: sortedIndexBy, 

    sortedIndexOf: sortedIndexOf, 

    sortedLastIndex: sortedLastIndex,

    sortedLastIndexBy: sortedLastIndexBy,

    sortedLastIndexOf: sortedLastIndexOf,

    sortedUniq: sortedUniq,

    sortedUniqBy: sortedUniqBy,

    tail: tail,

    take: take,

    takeRight: takeRight,

    takeRightWhile: takeRightWhile,

    takeWhile: takeWhile,

    union: union,

    unionBy: unionBy,

    unionWith: unionWith,

    uniq: uniq,

    uniqBy: uniqBy,

    uniqWith: uniqWith,

    unzip: unzip,

    unzipWith: unzipWith,

    zip: zip,

    without: without,

    xor: xor,

    xorBy: xorBy,

    xorWith: xorWith,

    zipObject: zipObject,

    //collection

    countBy: countBy,

    keyBy: keyBy,

    groupBy: groupBy,

    forEach: forEach,

    forEachRight: forEachRight,

    every: every,

    reduce: reduce,

    filter: filter,

    find: find,

    findLast: findLast,

    flatMap: flatMap,

    flatMapDeep: flatMapDeep,

    flatMapDepth: flatMapDepth,

    includes: includes,

    invokeMap: invokeMap,

    map: map,

    partition: partition,

    reduceRight: reduceRight,

    reject: reject,

    sample: sample,

    sampleSize: sampleSize,

    shuffle: shuffle,

    size: size,

    some: some,

    sortBy: sortBy,

    //function

    after: after,

    ary: ary,

    unary: unary,

    flip: flip,

    spread: spread,

    negate: negate,

    bind: bind,

    defer: defer,

    delay: delay,

    castArray: castArray,

    cloneDeep: cloneDeep,

    conformsTo: conformsTo,

    eq: eq,

    gt: gt,

    gte: gte,

    lt: lt,

    lte: lte,

    toArray: toArray,

    toFinite: toFinite,

    toInteger: toInteger,

    toLength: toLength,

    toNumber: toNumber,

    toSafeInteger: toSafeInteger,

    toString: toString,

    //Math
    
    max: max,

    maxBy: maxBy,

    add: add,

    ceil: ceil,

    divide: divide,

    floor: floor,

    mean: mean,

    meanBy: meanBy,

    min: min,

    minBy: minBy,

    multiply: multiply,

    round: round,

    subtract: subtract,

    sum: sum,

    sumBy: sumBy,

    //Number
    random: random,

    clamp: clamp,

    inRange: inRange,

    //Object
    assign: assign,

    assignIn: assignIn,

    defaults: defaults,

    defaultsDeep: defaultsDeep,

    toPairs: toPairs,

    toPairsIn: toPairsIn,

    findKey: findKey,

    findLastKey: findLastKey,

    forIn: forIn,

    forInRight: forInRight,

    forOwn: forInRight,

    forOwnRight: forOwnRight,

    functions: functions,

    functionsIn: functionsIn,

    has: has,

    hasIn: hasIn,

    invert: invert,

    invertBy: invertBy,

    invoke: invoke,

    keys: keys,

    keysIn: keysIn,

    mapKeys: mapKeys,

    mapValues: mapValues,

    merge: merge,

    mergeWith: mergeWith,

    omit: omit,

    omitBy: omitBy,

    pick: pick,

    pickBy: pickBy,

    result: result,

    set: set,

    setWith: setWith,

    transform: transform,

    unset: unset,

    update: update,

    updateWith: updateWith,

    values: values,

    valuesIn: valuesIn,

    at: at,

    get: get,

    toPath: toPath,

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

    //String
    words: words,

    capitalize: capitalize,

    camelCase: camelCase,

    //deburr: deburr,
     
    endsWith: endsWith,
     
    escape: escape,
     
    escapeRegExp: escapeRegExp,

     
    kebabCase: kebabCase,
     
    lowerCase: lowerCase,
     
    lowerFirst: lowerFirst,
     
    pad: pad,
     
    padEnd: padEnd,
     
    padStart: padStart,
     
    parseInt: parseInt,
     
    repeat: repeat,

    replace: replace,
     
    snakeCase: snakeCase,
     
    split: split,
     
    startCase: startCase,
     
    startsWith: startsWith,
          
    toLower: toLower,
     
    toUpper: toUpper,
     
    trim: trim,
     
    trimEnd: trimEnd,
     
    trimStart: trimStart,
     
    truncate: truncate,
   /*
     
     
    unescape: unescape,
     
    upperCase: upperCase,
     
    upperFirst: upperFirst,
    */
}


}()