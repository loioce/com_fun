/**
 * @desc 去重与获取重复
 * @return {res:去重后数组，rep：重复内容数组}
 * ** */
Array.prototype.unique = ()=>{
    let res = [],rep= [],json = {};
    for(let i=0,len = this.length;i<len;++i){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
            continue;
        }
        rep.push(this[i]);
    }
    return {res:res,rep:rep}
}
//ES6去重
let list = [1,2,1,2,3,4];
list = [...new Set(list)];//[1,2,3,4]


//求数组左右相等索引号
function findEvenIndex(arr)
{
  //Code goes here!
  for(var i=1,len = arr.length-1;i<len;++i){
    if(arr.slice(0,i).reduce(add) === arr.slice(i+1).reduceRight(add)){
     return i;
    }
  }
  return -1;
}

var add  = (a,b)=>{
  return a+b;
}


/******************************************** reduce充分应用 **********************************************/

  //replace (map && filter)
  const numbers = [10,20,30,40];
  const doubled = numbers.reduce((res,num)=>{
      num *= 2;
      if(num > 50){
        res.push(num);
      }
      return res;
  },[]);
  //ES6 filter
  let list = newSet([1,2,3,4,5]);
  list = [...list].filter((x)=>x>3);//[4,5]

  
  //匹配（ ）是否===
  const isBalance = (str)=>{
    return str.split('').reduce((count, char) => {
      if(count === '('){
        return ++count;
      }else if(chart === ')'){
        rturn --count;
      }
    },0)
  }
  isBalance('(((((/))');//0 false

  //数组出现次数转化成对象
  var cars = ['a','a','c','zz','bb','zz'];
  var carObj = cars.reduce((res,item)=>{
    res[item] = res[item] ? ++res[item] : 1;
  },{});


  /******深度拷贝 */
  let obj = {"aaa":1,"bbb":2};
  let obj1 = JSON.parse(JSON.stringify(obj));
  let obj2 = {...obj1};
  this.result = Object.assign({},obj2);