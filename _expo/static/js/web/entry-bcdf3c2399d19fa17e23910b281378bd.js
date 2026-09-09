(function(){
  var N=87;
  var HEX={0:6,4:6,5:6,20:6,34:6,40:6,42:7,45:6,47:6,48:6,50:6,53:6,57:6,62:6,65:6,68:6,78:6};
  function pad(i,w){i=String(i);while(i.length<w)i='0'+i;return i;}
  function unhex(s){
    s=s.replace(/\s+/g,'');
    var a=new Uint8Array(s.length/2);
    for(var i=0;i<a.length;i++) a[i]=parseInt(s.substr(i*2,2),16);
    return new TextDecoder('utf-8').decode(a);
  }
  function fail(e){
    document.body.innerHTML='<p style="font-family:Raleway,sans-serif;color:#fff;padding:24px;background:#000">Freedom Formula preview failed to load. Refresh once.</p>';
    console.error(e);
  }
  function load(i){
    var n=pad(i,3);
    var parts=HEX[i];
    if(parts){
      var reqs=[];
      for(var p=0;p<parts;p++) reqs.push(fetch('/_expo/static/js/web/chunks/'+n+'.js.hex.'+pad(p,2)).then(function(r){if(!r.ok)throw new Error('hex '+r.url+' '+r.status);return r.text();}));
      return Promise.all(reqs).then(function(xs){return unhex(xs.join(''));});
    }
    return fetch('/_expo/static/js/web/chunks/'+n+'.js').then(function(r){if(!r.ok)throw new Error('js '+n+' '+r.status);return r.text();});
  }
  Promise.all(Array.from({length:N},function(_,i){return load(i);})).then(function(parts){
    var s=document.createElement('script');
    s.src=URL.createObjectURL(new Blob([parts.join('')],{type:'text/javascript'}));
    document.body.appendChild(s);
  }).catch(fail);
})();
