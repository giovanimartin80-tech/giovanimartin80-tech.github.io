(function(){
 var N=85;
 function pad(i){i=String(i);while(i.length<3)i='0'+i;return i;}
 function fail(e){
 document.body.innerHTML='<p style="font-family:Raleway,sans-serif;color:#fff;padding:24px;background:#000">Freedom Formula preview failed to load. Refresh once.</p>';
 console.error(e);
 }
 Promise.all(Array.from({length:N},function(_,i){
  return fetch('/_expo/static/js/web/c4/'+pad(i)+'.js?v=pages4').then(function(r){
   if(!r.ok) throw new Error('chunk '+i+' '+r.status);
   return r.arrayBuffer();
  });
 })).then(function(bufs){
  var total=0; for(var i=0;i<bufs.length;i++) total+=bufs[i].byteLength;
  var out=new Uint8Array(total), o=0;
  for(var i=0;i<bufs.length;i++){ out.set(new Uint8Array(bufs[i]), o); o+=bufs[i].byteLength; }
  var s=document.createElement('script');
  s.src=URL.createObjectURL(new Blob([out],{type:'text/javascript'}));
  document.body.appendChild(s);
 }).catch(fail);
})();
