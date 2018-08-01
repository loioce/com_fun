
//打开数据库
var oparetIndexedDB = {
    openDB : (dbObj,name,version=1,storename="students",keys={"keyPath":"id"})=>{//打开数据库
        if(!window.indexedDB)window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB;
        let request = window.indexedDB.open(name,version);
        request.onerror = (e)=>{
            dbObj.db = e.target.result;
            console.error('open database error');
            console.log(e);
        }
        request.onsuccess = (e)=>{
            dbObj.db = e.target.result;
            console.log('open database success');
            console.log(e);
        }
        request.onupgradeneeded = (e)=>{
            console.log('DB version changed to '+version);
            let db = e.target.result;
            if(!db.objectStoreNames.contains(storename)) 
                db.createObjectStore(storename,keys);//建表
            dbObj.db = e.target.result;
            console.log('database update');
        }
        request.onclose = (e)=>{
            console.log('database close');
        }
    },
    closeDB : (db)=>{    //关闭数据库
        db.close();
        console.log('database closed');
    },
    deleDB : (name)=>{    //删除数据库
        let self = this;
        this.indexedDB.deleteDatabase(name);
        console.log('database delete');
    },
    addDBData :(db,storename,data)=>{    //添加数据
        console.log(db,storename,data);
        let transaction = db.transaction(storename,'readwrite');
        let store = transaction.objectStore(storename);
        let dataList = data;
        if(Object.prototype.toString.call(data) === '[object Array]'){
            for(let i=0,len=dataList.length;i<len;++i){
                request = store.add(data[i]);
                request.onerror = function(){
                    console.error('add fail,already has this data');
                };
                request.onsuccess = function(){
                    console.log('add success');
                };
            }
        }else if(Object.prototype.toString.call(data)==='[object Object]'){
            request = store.add(data);
            request.onerror = function(){
                console.error('add fail,already has this data');
            };
            request.onsuccess = function(){
                console.log('add success');
            };
        }else{
            console.error('the data must be ARRAY or OBJECT!');
        }
        //transaction = store = dataList = null;
    },
    putData:(db,storename,data)=>{
        let transaction = db.transaction(storename,'readwrite');
        let store = transaction.objectStore(storename);
        let dataList = data;
        if(Object.prototype.toString.call(data) === '[object Array]'){
            for(let i=0,len=dataList.length;i<len;++i){
                request = store.put(data[i]);
                request.onerror = function(){
                    console.error('put fail,already has this data');
                };
                request.onsuccess = function(){
                    console.log('put success');
                };
            }
        }else if(Object.prototype.toString.call(data)==='[object Object]'){
            request = store.put(data);
            request.onerror = function(){
                console.error('put fail,already has this data');
            };
            request.onsuccess = function(){
                console.log('put success');
            };
        }else{
            console.error('the data must be ARRAY or OBJECT!');
        }
    },
    getDataByKey:(db,storename,key,fn)=>{
        let transaction = db.transaction(storename,'readwrite');
        let store = transaction.objectStore(storename);
        let request = store.get(key);
        request.error=()=>{
            console.error('get key fail');
        };
        request.onsuccess = (e)=>{
            var result = e.target.result;
            console.log('get key success');
            fn(result);
        }
    },
    deleDBData:(db,storename,key)=>{//删除指定key记录
       let transaction = db.transaction(storename,'readwrite'); 
       let store = transaction.objectStore(storename);
       store.delete(key);
       console.log('delete 数据成功');  
    },
    clearData:(db,storename)=>{//删除存储空间记录
        let transaction = db.transaction(storename,'readwrite');
        let store = transaction.objectStore(storename);
        store.clear();
        console.log('删除存储空间记录成功');
    }
};
{
    var myDB = {
        name:'test',
        version:3,
        db:null
    };
    let students=[
        {
            id:'1001',
            name:"byron",
            age:'24',
        },
        {
            id:'1002',
            name:"leaon",
            age:'18',
        },
        {
            id:'1003',
            name:"loioce",
            age:'28',
        },
        {
            id:'1004',
            name:"july",
            age:'25',
        },
        {
            id:'1005',
            name:"oren",
            age:'20',
        },
        {
            id:'1006',
            name:"ywan",
            age:'40',
        }
    ];
    oparetIndexedDB.openDB(myDB,myDB.name,myDB.version,'students');
    setTimeout(()=>{
        //oparetIndexedDB.closeDB(myDB.db);
        //oparetIndexedDB.deleteDB(myDB.name);
        oparetIndexedDB.addDBData(myDB.db,'students',students);
    },600);
}