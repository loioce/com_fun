//关键时间点记录
function performanceTest() {
    
    let timing = performance.timing,
    readyStart = timing.fetchStart - timing.navigationStart,
    redirectTime = timing.redirectEnd - timing.redirectStart,
    appcacheTime = timing.domainLookupStart - timing.fetchStart,
    unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart,
    lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart,
    connectTime = timing.connectEnd - timing.connectStart,
    requestTime = timing.responseEnd - timing.requestStart,
    initDomTreeTime = timing.domInteractive - timing.responseEnd,
    domReadyTime = timing.domComplete - timing.domInteractive,
    loadEventTime = timing.loadEventEnd - timing.loadEventStart,
    loadTime = timing.loadEventEnd - timing.navigationStart;

    console.log('准备新页面时间耗时: ' + readyStart);
    console.log('redirect 重定向耗时: ' + redirectTime);
    console.log('Appcache 耗时: ' + appcacheTime);
    console.log('unload 前文档耗时: ' + unloadEventTime);
    console.log('DNS 查询耗时: ' + lookupDomainTime);
    console.log('TCP连接耗时: ' + connectTime);
    console.log('request请求耗时: ' + requestTime);
    console.log('请求完毕至DOM加载: ' + initDomTreeTime);
    console.log('解析DOM树耗时: ' + domReadyTime);
    console.log('load事件耗时: ' + loadEventTime);
    console.log('加载时间耗时: ' + loadTime);
 }

   /* performance.memory // 内存占用的具体数据
    
    performance.now() // performance.now()方法返回当前网页自performance.timing到现在的时间，可以精确到微秒，用于更加精确的计数。但实际上，目前网页性能通过毫秒来计算就足够了。
    
    performance.getEntries() // 获取页面所有加载资源的performance timing情况。浏览器获取网页时，会对网页中每一个对象（脚本文件、样式表、图片文件等）发出一个HTTP请求。performance.getEntries方法以数组形式返回所有请求的时间统计信息。
    
    performance.navigation // performance还可以提供用户行为信息，例如网络请求的类型和重定向次数等，一般都存放在performance.navigation对象里面。
    
    performance.navigation.redirectCount // 记录当前网页重定向跳转的次数。
    网址：https://www.w3.org/TR/resource-timing/。
    */
    //页面埋点计时-----执行过程进行埋点计时并上报
    let timeList = [];
    function addTime(tag) {
        timeList.push({
            "tag": tag,
            "time": +new Date
        });
    }
    
    addTime("loading");
    timeList.push({
        "tag": "load",
        "time": +new Date()
    });
    
    // TODOS，load加载时的操作
    timeList.push({
        "tag": "load",
        "time": +new Date()
    });
    
    timeList.push({
        "tag": "process",
        "time": +new Date()
    });
    
    // TODOS，process处理时的操作
    timeList.push({
        "tag": "process",
        "time": +new Date()
    });
    
    parseTime(timeList); // 输出{load: 时间毫秒数，process: 时间毫秒数}
    
    function parseTime(time) {
        let timeStep = {},
        endTime;
        for (let i = 0, len = time.length; i < len; i++) {
            if (!time[i]) continue;
            endTime = {};
            for (let j = i + 1; j < len; j++) {
                if (time[j] && time[i].tag == time[j].tag) {
                    endTime.tag = time[j].tag;
                    endTime.time = time[j].time;
                    time[j] = null;
                }
            }
            if (endTime.time >= 0 && endTime.tag) {
                timeStep[endTime.tag] = endTime.time - time[i].time;
            }
        }
        return timeStep;
    }


/******
 * @desc  监控页面节点属性和结构变化   ----**【异步触发】**
 * 
 */
/*说明：
    实例observer有三个方法： 1: observe  ;2: disconnect ; 3: takeRecords   ;
    config:{
        childList：子元素的变动
        attributes：属性的变动
        characterData：节点内容或节点文本的变动
        subtree：所有下属节点（包括子节点和子节点的子节点）的变动
        attributeFilter: 监听制定属性[attrName]
    }
    注：subtree不可以单独使用，需和其它属性配合；
        attributeOldValue：值为true或者为false。如果为true，则表示需要记录变动前的属性值。
        characterDataOldValue：值为true或者为false。如果为true，则表示需要记录变动前的数据值。
        attributesFilter：值为一个数组，表示需要观察的特定属性（比如['class', 'str']）。

    record:{
        type:观察的变动类型（attribute、characterData或者childList）。
        target:发生变动的DOM对象。
        addedNodes:新增的DOM对象。
        removeNodes:删除的DOM对象。
        previousSibling:前一个同级的DOM对象，如果没有则返回null。
        nextSibling:下一个同级的DOM对象，如果没有就返回null。
        attributeName:发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。
        oldValue:变动前的值。这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null。        
    }
   
    停止监听观察： observer.disconnect();
    清楚历史监听记录： observer.takeRecord;

    //属性变动：
    config = {
        attribute:true,
        attributeOldValue:true
    }
    
    //子元素变动
    config = {
        childList:true,
        subtree:true
    }

    //对body下所有元素监控
    observer.observe(document.body,config);
*/
function catchObserver(nodeID){
    var MutatoinObserver = window.MutationObserver || 
    window.WebkitMutationObserver ||
    window.MozMutationObserver;//浏览器兼容
    var config = {attributes:true,childList:true};//配置对象
    
    var _t = document.querySelector(nodeID);
    var observer = new MutationObserver(function(mutations){

        mutations.forEach((record)=>{
            console.log(record);
            if(record.type == "attributes"){
                console.log('record type is attributes');
            }
            if(record.type == "childList"){
                cosole.log('record type id childList');
            }
        });
     });
    if(_t.length>1){
        _t.forEach((i,val)=>{
            observer.observe(_t[i],config);
        })
        return false;
    }
    observer.observe(_t,config);
}