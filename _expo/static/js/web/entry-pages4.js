(function(){
 var N=85;
 var HEX={1:28};
 function pad(i,w){i=String(i);while(i.length<w)i='0'+i;return i;}
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
 function loadOne(i){
  if(HEX[i]){
   var n=HEX[i], parts=[];
   function next(j){
    if(j>=n) return Promise.resolve(unhex(parts.join('')));
    return fetch('/_expo/static/js/web/c4/'+pad(i,3)+'.js.hex.'+pad(j,2)+'?v=pages4').then(function(r){
     if(!r.ok) throw new Error('hex '+i+' '+j+' '+r.status);
     return r.text();
    }).then(function(t){ parts.push(t); return next(j+1); });
   }
   return next(0);
  }
  return fetch('/_expo/static/js/web/c4/'+pad(i,3)+'.js?v=pages4').then(function(r){
   if(!r.ok) throw new Error('js '+i+' '+r.status);
   return r.arrayBuffer();
  }).then(function(b){ return new Uint8Array(b); });
 }
 Promise.all(Array.from({length:N},function(_,i){ return loadOne(i); })).then(function(parts){
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].length;
  var out=new Uint8Array(total), o=0;
  for(var i=0;i<parts.length;i++){ out.set(parts[i], o); o+=parts[i].length; }
  var s=document.createElement('script');
  s.src=URL.createObjectURL(new Blob([out],{type:'text/javascript'}));
  document.body.appendChild(s);
 }).catch(fail);
})();
