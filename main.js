const hh = document.getElementById('hh');
const mm = document.getElementById('mm');
const ss = document.getElementById('ss');

const sec_dot = document.querySelector('.sec-dot');
const min_dot = document.querySelector('.min-dot');
const hr_dot  = document.querySelector('.hr-dot');

function tick() {
  const date = new Date();

  // ساعت به ۱۲ برمی‌گرده و با دقیقه نرم می‌شه
  const h = (date.getHours() % 12) + date.getMinutes() / 60;
  const m = date.getMinutes() + date.getSeconds() / 60;
  const s = date.getSeconds() + date.getMilliseconds() / 1000;

  hh.style.strokeDashoffset = 510 - (510 * h) / 12;
  mm.style.strokeDashoffset = 630 - (630 * m) / 60;
  ss.style.strokeDashoffset = 760 - (760 * s) / 60;

  hr_dot.style.transform  = `rotate(${h * 30}deg)`;
  min_dot.style.transform = `rotate(${m * 6}deg)`;
  sec_dot.style.transform = `rotate(${s * 6}deg)`;

  requestAnimationFrame(tick);
}

tick();