/**
* jQuery Touchdown Plugin <https://github.com/samuelcotterall/Touchdown>
* 
* By Samuel Cotterall <http://samuelcotterall.com>
*/
(function(a){a.fn.Touchdown=function(){return this.each(function(){$this=a(this);var b=$this.parents().length,c=$this.find("a"),d="Navigate",e;if($this.attr("title")){d=$this.attr("title")}e+='<option value="">'+d+"</option>";for(var f=0;f<c.length;f++){var g=a(c[f]),h=(g.parents().length-b)/2-1,i="";while(h>0){i+="  ";h--}e+='<option value="'+g.attr("href")+'">'+i+g.text()+"</option>"}$this.addClass("touchdown-list").after('<select class="touchdown"> '+e+"</select>");$this.next("select").change(function(){window.location=a(this).val()})})}})(jQuery)