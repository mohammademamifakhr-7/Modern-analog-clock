function tick() {
     // Get clock hands
     const hh = document.getElementById('hh');
     const mm = document.getElementById('mm');
     const ss = document.getElementById('ss');

     // Get current time
     const date = new Date();
     const h = date.getHours();
     const m = date.getMinutes();
     const s = date.getSeconds();

     // Update clock hands offset
     hh.style.strokeDashoffset = 510 - (510 * h) / 12;
     mm.style.strokeDashoffset = 630 - (630 * m) / 60;
     ss.style.strokeDashoffset = 760 - (760 * s) / 60;

     requestAnimationFrame(tick);
}

tick()