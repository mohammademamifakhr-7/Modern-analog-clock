/* ==========================================================================
   Modern Analog Clock — engine
   --------------------------------------------------------------------------
   Rings   → animated with stroke-dashoffset
   Dots    → SVG transform="rotate(deg 125 125)"
   Needles → CSS custom property --angle
   Digital → textContent
   ========================================================================== */

(function () {
  "use strict";

  /* --- 1. Element references -------------------------------------------- */

  const els = {
    secondRing: document.getElementById("ss"),
    minuteRing: document.getElementById("mm"),
    hourRing:   document.getElementById("hh"),

    secondDot:  document.getElementById("sec-dot"),
    minuteDot:  document.getElementById("min-dot"),
    hourDot:    document.getElementById("hr-dot"),

    secondNeedle: document.getElementById("sec-needle"),
    minuteNeedle: document.getElementById("min-needle"),
    hourNeedle:   document.getElementById("hr-needle"),

    digitalTime:   document.getElementById("digital-time"),
    digitalPeriod: document.getElementById("digital-period"),
  };

  /* --- 2. Ring geometry -------------------------------------------------- */

  const rings = [
    { el: els.secondRing, r: 120 },
    { el: els.minuteRing, r: 100 },
    { el: els.hourRing,   r: 80  },
  ];

  rings.forEach((ring) => {
    ring.circumference = 2 * Math.PI * ring.r;
    ring.el.style.strokeDasharray  = ring.circumference;
    ring.el.style.strokeDashoffset = ring.circumference; // empty at start
  });

  /* --- 3. Helpers -------------------------------------------------------- */

  const pad2 = (n) => String(n).padStart(2, "0");

  // Reveal `ratio` of the ring (0 = empty, 1 = full)
  const setRing = (ring, ratio) => {
    ring.el.style.strokeDashoffset = ring.circumference * (1 - ratio);
  };

  // Rotate an SVG dot around the ring centre (125,125)
  const setDot = (dot, degrees) => {
    dot.setAttribute("transform", `rotate(${degrees} 125 125)`);
  };

  // Rotate an HTML needle around its base
  const setNeedle = (needle, degrees) => {
    needle.style.setProperty("--angle", `${degrees}deg`);
  };

  /* --- 4. Main loop ------------------------------------------------------ */

  function tick() {
    const now = new Date();

    const rawHours   = now.getHours();
    const rawMinutes = now.getMinutes();
    const rawSeconds = now.getSeconds();
    const ms         = now.getMilliseconds();

    // Smooth fractional time so motion is continuous, not stepped
    const seconds = rawSeconds + ms / 1000;
    const minutes = rawMinutes + seconds / 60;
    const hours   = (rawHours % 12) + minutes / 60;

    // Rings — fill ratio 0..1
    setRing(rings[0], seconds / 60);
    setRing(rings[1], minutes / 60);
    setRing(rings[2], hours   / 12);

    // Dots — 6°/minute, 6°/second, 30°/hour
    setDot(els.secondDot, seconds * 6);
    setDot(els.minuteDot, minutes * 6);
    setDot(els.hourDot,   hours   * 30);

    // Needles — same angles as dots
    setNeedle(els.secondNeedle, seconds * 6);
    setNeedle(els.minuteNeedle, minutes * 6);
    setNeedle(els.hourNeedle,   hours   * 30);

    // Digital display — 12-hour format with AM/PM
    const h12 = rawHours % 12 || 12;
    els.digitalTime.textContent =
      `${pad2(h12)}:${pad2(rawMinutes)}:${pad2(rawSeconds)}`;
    els.digitalTime.setAttribute(
      "datetime",
      `${pad2(rawHours)}:${pad2(rawMinutes)}:${pad2(rawSeconds)}`
    );
    els.digitalPeriod.textContent = rawHours >= 12 ? "PM" : "AM";

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();