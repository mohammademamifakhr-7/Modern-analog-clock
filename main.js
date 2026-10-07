// Get clock hand elements (hour, minute, second)
const hh = document.getElementById('hh');
const mm = document.getElementById('mm');
const ss = document.getElementById('ss');

// Get dot elements (hour, minute, second markers)
const sec_dot = document.querySelector('.sec-dot');
const min_dot = document.querySelector('.min-dot');
const hr_dot = document.querySelector('.hr-dot');

// Get needle elements (hour, minute, second needle)
const sec_needle = document.querySelector('.needle-sec');
const min_needle = document.querySelector('.needle-min');
const hr_needle = document.querySelector('.needle-hr');

// Main clock loop
function tick() {
     // Current date and time
     const date = new Date();

     // Convert time to smooth values (with fractional part)
     // Hour: wrap to 12 and add minutes for smooth movement
     const h = (date.getHours() % 12) + date.getMinutes() / 60;
     // Minute: add seconds for smooth movement
     const m = date.getMinutes() + date.getSeconds() / 60;
     // Second: add milliseconds for smooth movement
     const s = date.getSeconds() + date.getMilliseconds() / 1000;

     // Update clock hands stroke offset (progress around the circle)
     hh.style.strokeDashoffset = 510 - (510 * h) / 12;
     mm.style.strokeDashoffset = 630 - (630 * m) / 60;
     ss.style.strokeDashoffset = 760 - (760 * s) / 60;

     // Rotate dots to match each hand
     hr_dot.style.transform = `rotate(${h * 30}deg)`;
     min_dot.style.transform = `rotate(${m * 6}deg)`;
     sec_dot.style.transform = `rotate(${s * 6}deg)`;

     // Rotate needles to match each hand
     hr_needle.style.transform = `rotate(${h * 30}deg)`;
     min_needle.style.transform = `rotate(${m * 6}deg)`;
     sec_needle.style.transform = `rotate(${s * 6}deg)`;

     // Loop on next frame
     requestAnimationFrame(tick);
}

// Start clock
tick();