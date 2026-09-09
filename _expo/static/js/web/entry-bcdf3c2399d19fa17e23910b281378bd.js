(function(){
  function run(buf){
    var blob = new Blob([buf], {type:"text/javascript"});
    var s = document.createElement("script");
    s.src = URL.createObjectURL(blob);
    document.body.appendChild(s);
  }
  function fail(e){
    document.body.innerHTML = "<p style=\"font-family:Raleway,sans-serif;color:#fff;padding:24px;background:#000\">Freedom Formula preview failed to load. Refresh once.</p>";
    console.error(e);
  }
  fetch("https://litter.catbox.moe/ory750.gz").then(function(r){
    if(!r.ok) throw new Error("gzip "+r.status);
    if (typeof DecompressionStream !== "function") throw new Error("no DecompressionStream");
    return new Response(r.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
  }).then(run).catch(fail);
})();
