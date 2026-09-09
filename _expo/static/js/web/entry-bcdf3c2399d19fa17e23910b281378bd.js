(function(){
  var base = "/_expo/static/js/web/entry-bcdf3c2399d19fa17e23910b281378bd.js.";
  var n = 8;
  function load(i){
    return fetch(base + i).then(function(r){ if(!r.ok) throw new Error("part "+i); return r.arrayBuffer(); });
  }
  Promise.all(Array.from({length:n}, function(_,i){ return load(i); }))
    .then(function(bufs){
      var blob = new Blob(bufs, {type:"text/javascript"});
      var s = document.createElement("script");
      s.src = URL.createObjectURL(blob);
      s.defer = true;
      document.body.appendChild(s);
    })
    .catch(function(e){
      document.body.innerHTML = "<p style=\"font-family:Raleway,sans-serif;color:#fff;padding:24px;background:#000\">Freedom Formula preview failed to load. Refresh once.</p>";
      console.error(e);
    });
})();
