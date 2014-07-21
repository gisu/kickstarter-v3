/*
* TableSorter 2.0 - Client-side table sorting with ease!
* Version 2.0.28 Minified using http://dean.edwards.name/packer/
* Copyright (c) 2007 Christian Bach
*/

!(function($){$.extend({tablesorter:new function(){var g=[],widgets=[],tbl;this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",cssChildRow:"expand-child",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,sortLocaleCompare:false,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:false,cancelSelection:true,sortList:[],headerList:[],dateFormat:"mmddyyyy",onRenderHeader:null,selectorHeaders:'thead th',tableClass:'tablesorter',debug:false};function log(s){if(typeof console!=="undefined"&&typeof console.log!=="undefined"){console.log(s)}else{alert(s)}}function benchmark(s,d){log(s+","+(new Date().getTime()-d.getTime())+"ms")}this.benchmark=benchmark;function getElementText(a,b,c){var d="",te=a.textExtraction;if(!b){return""}if(!a.supportsTextContent){a.supportsTextContent=b.textContent||false}if(te==="simple"){if(a.supportsTextContent){d=b.textContent}else{if(b.childNodes[0]&&b.childNodes[0].hasChildNodes()){d=b.childNodes[0].innerHTML}else{d=b.innerHTML}}}else{if(typeof(te)==="function"){d=te(b)}else if(typeof(te)==="object"&&te.hasOwnProperty(c)){d=te[c](b)}else{d=$(b).text()}}return d}function getParserById(a){var i,l=g.length;for(i=0;i<l;i++){if(g[i].id.toLowerCase()===a.toLowerCase()){return g[i]}}return false}function getNodeFromRowAndCellIndex(a,b,c){return a[b].cells[c]}function trimAndGetNodeText(a,b,c){return $.trim(getElementText(a,b,c))}function detectParserForColumn(a,b,c,d){var i,l=g.length,node=false,nodeValue='',keepLooking=true;while(nodeValue===''&&keepLooking){c++;if(b[c]){node=getNodeFromRowAndCellIndex(b,c,d);nodeValue=trimAndGetNodeText(a.config,node,d);if(a.config.debug){log('Checking if value was empty on row:'+c)}}else{keepLooking=false}}for(i=1;i<l;i++){if(g[i].is(nodeValue,a,node)){return g[i]}}return g[0]}function buildParserCache(a,b){if(a.tBodies.length===0){return}var c=a.tBodies[0].rows,list,cells,l,h,i,p,parsersDebug="";if(c[0]){list=[];cells=c[0].cells;l=cells.length;for(i=0;i<l;i++){p=false;h=$(b[i]);if($.metadata&&(h.metadata()&&h.metadata().sorter)){p=getParserById(h.metadata().sorter)}else if((a.config.headers[i]&&a.config.headers[i].sorter)){p=getParserById(a.config.headers[i].sorter)}else if(h.attr('class')&&h.attr('class').match('sorter-')){p=getParserById(h.attr('class').match(/sorter-(\w+)/)[1]||'')}if(!p){p=detectParserForColumn(a,c,-1,i)}if(a.config.debug){parsersDebug+="column:"+i+" parser:"+p.id+"\n"}list.push(p)}}if(a.config.debug){log(parsersDebug)}return list}function buildCache(a){var b=a.tBodies[0],totalRows=(b&&b.rows.length)||0,totalCells=(b.rows[0]&&b.rows[0].cells.length)||0,g=a.config.parsers,cache={row:[],normalized:[]},t,i,j,c,cols,cacheTime;if(a.config.debug){cacheTime=new Date()}for(i=0;i<totalRows;++i){c=$(b.rows[i]);cols=[];if(c.hasClass(a.config.cssChildRow)){cache.row[cache.row.length-1]=cache.row[cache.row.length-1].add(c);continue}cache.row.push(c);for(j=0;j<totalCells;++j){t=trimAndGetNodeText(a.config,c[0].cells[j],j);cols.push(t===''?'':g[j].format(t,a,c[0].cells[j],j))}cols.push(cache.normalized.length);cache.normalized.push(cols)}if(a.config.debug){benchmark("Building cache for "+totalRows+" rows:",cacheTime)}a.config.cache=cache;return cache}function initWidgets(a){var i,w,l=widgets.length;for(i=0;i<l;i++){w=widgets[i];if(w&&w.hasOwnProperty('init')){w.init(a,widgets,w)}}}function getWidgetById(a){var i,w,l=widgets.length;for(i=0;i<l;i++){w=widgets[i];if(w&&w.hasOwnProperty('id')&&w.id.toLowerCase()===a.toLowerCase()){return w}}}function applyWidget(a){var c=a.config.widgets,i,w,l=c.length;for(i=0;i<l;i++){w=getWidgetById(c[i]);if(w&&w.hasOwnProperty('format')){w.format(a)}}}function appendToTable(a,b){var c=a.config,r=b.row,n=b.normalized,totalRows=n.length,checkCell=totalRows?(n[0].length-1):0,rows=[],i,j,l,pos,appendTime;if(c.debug){appendTime=new Date()}for(i=0;i<totalRows;i++){pos=n[i][checkCell];rows.push(r[pos]);if(!c.appender||!c.removeRows){l=r[pos].length;for(j=0;j<l;j++){a.tBodies[0].appendChild(r[pos][j])}}}if(c.appender){c.appender(a,rows)}if(c.debug){benchmark("Rebuilt table:",appendTime)}applyWidget(a);setTimeout(function(){$(a).trigger("sortEnd",a)},0)}function computeTableHeaderCellIndexes(t){var a=[],lookup={},thead=t.getElementsByTagName('THEAD')[0],trs=thead.getElementsByTagName('TR'),i,j,k,l,c,cells,rowIndex,cellId,rowSpan,colSpan,firstAvailCol,matrixrow;for(i=0;i<trs.length;i++){cells=trs[i].cells;for(j=0;j<cells.length;j++){c=cells[j];rowIndex=c.parentNode.rowIndex;cellId=rowIndex+"-"+c.cellIndex;rowSpan=c.rowSpan||1;colSpan=c.colSpan||1;if(typeof(a[rowIndex])==="undefined"){a[rowIndex]=[]}for(k=0;k<a[rowIndex].length+1;k++){if(typeof(a[rowIndex][k])==="undefined"){firstAvailCol=k;break}}lookup[cellId]=firstAvailCol;for(k=rowIndex;k<rowIndex+rowSpan;k++){if(typeof(a[k])==="undefined"){a[k]=[]}matrixrow=a[k];for(l=firstAvailCol;l<firstAvailCol+colSpan;l++){matrixrow[l]="x"}}}}return lookup}function formatSortingOrder(v){if(typeof(v)!=="number"){return(v.toLowerCase().charAt(0)==="d")?1:0}else{return(v===1)?1:0}}function checkHeaderMetadata(a){return(($.metadata)&&($(a).metadata().sorter===false))}function checkHeaderOptions(a,i){return((a.config.headers[i])&&(a.config.headers[i].sorter===false))}function checkHeaderLocked(a,i){if((a.config.headers[i])&&(a.config.headers[i].lockedOrder!==null)){return a.config.headers[i].lockedOrder}return false}function checkHeaderOrder(a,i){if((a.config.headers[i])&&(a.config.headers[i].sortInitialOrder)){return a.config.headers[i].sortInitialOrder}return a.config.sortInitialOrder}function buildHeaders(b){var d=($.metadata)?true:false,header_index=computeTableHeaderCellIndexes(b),$th,lock,time,$tableHeaders,c=b.config;c.headerList=[];if(c.debug){time=new Date()}$tableHeaders=$(c.selectorHeaders,b).wrapInner("<span/>").each(function(a){this.column=header_index[this.parentNode.rowIndex+"-"+this.cellIndex];this.order=formatSortingOrder(checkHeaderOrder(b,a));this.count=this.order;if(checkHeaderMetadata(this)||checkHeaderOptions(b,a)||$(this).is('.sorter-false')){this.sortDisabled=true}this.lockedOrder=false;lock=checkHeaderLocked(b,a);if(typeof(lock)!=='undefined'&&lock!==false){this.order=this.lockedOrder=formatSortingOrder(lock)}if(!this.sortDisabled){$th=$(this).addClass(c.cssHeader);if(c.onRenderHeader){c.onRenderHeader.apply($th,[a])}}c.headerList[a]=this});if(c.debug){benchmark("Built headers:",time);log($tableHeaders)}return $tableHeaders}function checkCellColSpan(a,b,d){var i,cell,arr=[],r=a.tHead.rows,c=r[d].cells;for(i=0;i<c.length;i++){cell=c[i];if(cell.colSpan>1){arr=arr.concat(checkCellColSpan(a,b,d++))}else{if(a.tHead.length===1||(cell.rowSpan>1||!r[d+1])){arr.push(cell)}}}return arr}function isValueInArray(v,a){var i,l=a.length;for(i=0;i<l;i++){if(a[i][0]===v){return true}}return false}function setHeadersCss(b,c,d,e){c.removeClass(e[0]).removeClass(e[1]);var h=[],i,l;c.each(function(a){if(!this.sortDisabled){h[this.column]=$(this)}});l=d.length;for(i=0;i<l;i++){if(d[i][1]===2){continue}h[d[i][0]].addClass(e[d[i][1]])}}function fixColumnWidth(a,b){if(a.config.widthFixed){var c=$('<colgroup>');$("tr:first td",a.tBodies[0]).each(function(){c.append($('<col>').css('width',$(this).width()))});$(a).prepend(c)}}function updateHeaderSortCount(a,b){var i,s,o,c=a.config,l=b.length;for(i=0;i<l;i++){s=b[i];o=c.headerList[s[0]];o.count=s[1];o.count++}}function getCachedSortType(a,i){return(a)?a[i].type:''}function multisort(a,b,d){var f="var sortWrapper = function(a,b) {",col,mx=0,dir=0,tc=a.config,lc=d.normalized.length,l=b.length,sortTime,i,j,c,s,e,order,orgOrderCol;if(tc.debug){sortTime=new Date()}for(i=0;i<l;i++){c=b[i][0];order=b[i][1];s=(getCachedSortType(tc.parsers,c)==="text")?((order===0)?"sortText":"sortTextDesc"):((order===0)?"sortNumeric":"sortNumericDesc");e="e"+i;if(/Numeric/.test(s)&&tc.headers[c]&&tc.headers[c].string){for(j=0;j<lc;j++){col=Math.abs(parseFloat(d.normalized[j][c]));mx=Math.max(mx,isNaN(col)?0:col)}dir=(tc.headers[c])?tc.string[tc.headers[c].string]||0:0}f+="var "+e+" = "+s+"(a["+c+"],b["+c+"],"+mx+","+dir+"); ";f+="if ("+e+") { return "+e+"; } ";f+="else { "}orgOrderCol=(d.normalized&&d.normalized[0])?d.normalized[0].length-1:0;f+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(i=0;i<l;i++){f+="}; "}f+="return 0; ";f+="}; ";eval(f);d.normalized.sort(sortWrapper);if(tc.debug){benchmark("Sorting on "+b.toString()+" and dir "+order+" time:",sortTime)}return d}function sortText(a,b){if(a===''){return 1}if(b===''){return-1}if(a===b){return 0}if($.data(tbl[0],"tablesorter").sortLocaleCompare){return a.localeCompare(b)}try{var c=0,ax,t,x=/^(\.)?\d/,L=Math.min(a.length,b.length)+1;while(c<L&&a.charAt(c)===b.charAt(c)&&x.test(b.substring(c))===false&&x.test(a.substring(c))===false){c++}a=a.substring(c);b=b.substring(c);if(x.test(a)||x.test(b)){if(x.test(a)===false){return(a)?1:-1}else if(x.test(b)===false){return(b)?-1:1}else{t=parseFloat(a)-parseFloat(b);if(t!==0){return t}else{t=a.search(/[^\.\d]/)}if(t===-1){t=b.search(/[^\.\d]/)}a=a.substring(t);b=b.substring(t)}}return(a>b)?1:-1}catch(er){return 0}}function sortTextDesc(a,b){if(a===''){return 1}if(b===''){return-1}if(a===b){return 0}if($.data(tbl[0],"tablesorter").sortLocaleCompare){return b.localeCompare(a)}return-sortText(a,b)}function getTextValue(a,b,d){if(b){var i,l=a.length,n=b+d;for(i=0;i<l;i++){n+=a.charCodeAt(i)}return d*n}return 0}function sortNumeric(a,b,c,d){if(a===''){return 1}if(b===''){return-1}if(isNaN(a)){a=getTextValue(a,c,d)}if(isNaN(b)){b=getTextValue(b,c,d)}return a-b}function sortNumericDesc(a,b,c,d){if(a===''){return 1}if(b===''){return-1}if(isNaN(a)){a=getTextValue(a,c,d)}if(isNaN(b)){b=getTextValue(b,c,d)}return b-a}this.construct=function(d){return this.each(function(){if(!this.tHead||!this.tBodies){return}var c,$document,$headers,cache,config,shiftDown=0,sortOrder,sortCSS,totalRows,$cell,i,j,a,s,o;this.config={};config=$.extend(this.config,$.tablesorter.defaults,d);tbl=c=$(this).addClass(this.config.tableClass);$.data(this,"tablesorter",config);$headers=buildHeaders(this);this.config.parsers=buildParserCache(this,$headers);this.config.string={max:1,'max+':1,'max-':-1,none:0};cache=buildCache(this);sortCSS=[config.cssDesc,config.cssAsc];fixColumnWidth(this);$headers.click(function(e){totalRows=(c[0].tBodies[0]&&c[0].tBodies[0].rows.length)||0;if(!this.sortDisabled){c.trigger("sortStart",tbl[0]);$cell=$(this);i=this.column;this.order=this.count++%(config.sortReset?3:2);if(typeof(this.lockedOrder)!=="undefined"&&this.lockedOrder!==false){this.order=this.lockedOrder}if(!e[config.sortMultiSortKey]){config.sortList=[];if(config.sortForce!==null){a=config.sortForce;for(j=0;j<a.length;j++){if(a[j][0]!==i){config.sortList.push(a[j])}}}if(this.order<2){config.sortList.push([i,this.order])}}else{if(isValueInArray(i,config.sortList)){for(j=0;j<config.sortList.length;j++){s=config.sortList[j];o=config.headerList[s[0]];if(s[0]===i){o.count=s[1];o.count++;s[1]=o.count%(config.sortReset?3:2);if(s[1]>=2){config.sortList.splice(j,1);o.count=0}}}}else{if(this.order<2){config.sortList.push([i,this.order])}}}if(config.sortAppend!==null){a=config.sortAppend;for(j=0;j<a.length;j++){if(a[j][0]!==i){config.sortList.push(a[j])}}}c.trigger("sortBegin",tbl[0]);setTimeout(function(){setHeadersCss(c[0],$headers,config.sortList,sortCSS);appendToTable(c[0],multisort(c[0],config.sortList,cache))},1);return false}}).mousedown(function(){if(config.cancelSelection){this.onselectstart=function(){return false};return false}});c.bind("update",function(){var a=this;setTimeout(function(){a.config.parsers=buildParserCache(a,$headers);cache=buildCache(a);c.trigger("sorton",[a.config.sortList])},1)}).bind("updateCell",function(e,a){var b=this.config,pos=[(a.parentNode.rowIndex-1),a.cellIndex];cache.normalized[pos[0]][pos[1]]=b.parsers[pos[1]].format(getElementText(b,a,pos[1]),a);this.config.cache=cache;c.trigger("sorton",[b.sortList])}).bind("addRows",function(e,a){var i,config=this.config,rows=a.filter('tr').length,dat=[],l=a[0].cells.length;for(i=0;i<rows;i++){for(j=0;j<l;j++){dat[j]=config.parsers[j].format(getElementText(config,a[i].cells[j],j),a[i].cells[j])}dat.push(cache.row.length);cache.row.push([a[i]]);cache.normalized.push(dat);dat=[]}config.cache=cache;c.trigger("sorton",[config.sortList])}).bind("sorton",function(e,a){$(this).trigger("sortStart",tbl[0]);config.sortList=a;var b=config.sortList;updateHeaderSortCount(this,b);setHeadersCss(this,$headers,b,sortCSS);appendToTable(this,multisort(this,b,cache))}).bind("appendCache",function(){appendToTable(this,cache)}).bind("applyWidgetId",function(e,a){getWidgetById(a).format(this)}).bind("applyWidgets",function(){applyWidget(this)});if($.metadata&&($(this).metadata()&&$(this).metadata().sortlist)){config.sortList=$(this).metadata().sortlist}initWidgets(this);if(config.sortList.length>0){c.trigger("sorton",[config.sortList])}else{applyWidget(this)}})};this.addParser=function(b){var i,l=g.length,a=true;for(i=0;i<l;i++){if(g[i].id.toLowerCase()===b.id.toLowerCase()){a=false}}if(a){g.push(b)}};this.addWidget=function(a){widgets.push(a)};this.formatFloat=function(s){var i=parseFloat(s);return isNaN(i)?$.trim(s):i};this.isDigit=function(s){return(/^[\-+]?\d*$/).test($.trim(s.replace(/[,.']/g,'')))};this.clearTableBody=function(a){if($.browser.msie){var b=function(){while(this.firstChild){this.removeChild(this.firstChild)}};b.apply(a.tBodies[0])}else{a.tBodies[0].innerHTML=""}}}})();$.fn.extend({tablesorter:$.tablesorter.construct});var m=$.tablesorter;m.addParser({id:"text",is:function(s){return true},format:function(s){return $.trim(s.toLocaleLowerCase())},type:"text"});m.addParser({id:"digit",is:function(s){return $.tablesorter.isDigit(s.replace(/,/g,""))},format:function(s){return $.tablesorter.formatFloat(s.replace(/,/g,""))},type:"numeric"});m.addParser({id:"currency",is:function(s){return(/^[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]/).test(s)},format:function(s){return $.tablesorter.formatFloat(s.replace(/\,/g,'.').replace(new RegExp(/[^0-9. \-]/g),""))},type:"numeric"});m.addParser({id:"ipAddress",is:function(s){return(/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/).test(s)},format:function(s){var i,item,a=s.split("."),r="",l=a.length;for(i=0;i<l;i++){item=a[i];if(item.length===2){r+="0"+item}else{r+=item}}return $.tablesorter.formatFloat(r)},type:"numeric"});m.addParser({id:"url",is:function(s){return(/^(https?|ftp|file):\/\/$/).test(s)},format:function(s){return $.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''))},type:"text"});m.addParser({id:"isoDate",is:function(s){return(/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/).test(s)},format:function(s){return $.tablesorter.formatFloat((s!=="")?new Date(s.replace(new RegExp(/-/g),"/")).getTime():"0")},type:"numeric"});m.addParser({id:"percent",is:function(s){return(/\%$/).test($.trim(s))},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""))},type:"numeric"});m.addParser({id:"usLongDate",is:function(s){return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/))},format:function(s){return $.tablesorter.formatFloat(new Date(s).getTime())},type:"numeric"});m.addParser({id:"shortDate",is:function(s){return(/\d{1,4}[\/\-\,\.\s+]\d{1,4}[\/\-\.\,\s+]\d{1,4}/).test(s)},format:function(s,a,b,d){var c=a.config,format=(c.headers&&c.headers[d])?c.headers[d].dateFormat||c.dateFormat:c.dateFormat;s=s.replace(/\s+/g," ").replace(/[\-|\.|\,|\s]/g,"/");if(format==="mmddyyyy"){s=s.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/,"$3/$1/$2")}else if(format==="ddmmyyyy"){s=s.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/,"$3/$2/$1")}else if(format==="yyyymmdd"){s=s.replace(/(\d{4})\/(\d{1,2})\/(\d{1,2})/,"$1/$2/$3")}return $.tablesorter.formatFloat(new Date(s).getTime())},type:"numeric"});m.addParser({id:"time",is:function(s){return(/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/).test(s)},format:function(s){return $.tablesorter.formatFloat(new Date("2000/01/01 "+s).getTime())},type:"numeric"});m.addParser({id:"metadata",is:function(s){return false},format:function(s,a,b){var c=a.config,p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;return $(b).metadata()[p]},type:"numeric"});m.addWidget({id:"zebra",format:function(a){var b,row=0,even,time,child=a.config.cssChildRow,css=a.config.widgetZebra.css;if(a.config.debug){time=new Date()}$("tr:visible",a.tBodies[0]).each(function(i){b=$(this);if(!b.hasClass(child)){row++}even=(row%2===0);b.removeClass(css[even?1:0]).addClass(css[even?0:1])});if(a.config.debug){$.tablesorter.benchmark("Applying Zebra widget",time)}}})})(jQuery);
