(function(){
 var N=170;
 function pad(i){i=String(i);while(i.length<3)i='0'+i;return i;}
 function unhex(s){
  s=s.replace(/\s+/g,'');
  var a=new Uint8Array(s.length/2);
  for(var i=0;i<a.length;i++) a[i]=parseInt(s.substr(i*2,2),16);
  return a;
 }
 function fail(e){
  document.body.innerHTML='<p style="font-family:Raleway,sans-serif;color:#fff;padding:24px;background:#000">Freedom Formula preview failed to load. Refresh once.</p>';
  console.error(e);
 }
 Promise.all(Array.from({length:N},function(_,i){
  return fetch('/_expo/static/js/web/h4/'+pad(i)+'.hex?v=pages4').then(function(r){
   if(!r.ok) throw new Error('hex '+i+' '+r.status);
   return r.text();
  });
 })).then(function(xs){
  var parts=xs.map(unhex);
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].length;
  var out=new Uint8Array(total), o=0;
  for(var i=0;i<parts.length;i++){ out.set(parts[i], o); o+=parts[i].length; }
  var s=document.createElement('script');
  s.src=URL.createObjectURL(new Blob([out],{type:'text/javascript'}));
  document.body.appendChild(s);
 }).catch(fail);
})();
