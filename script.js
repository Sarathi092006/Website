document.addEventListener('DOMContentLoaded', function () {

  // Mobile / tablet menu toggle
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('menu');
  toggle.addEventListener('click', function () {
    menu.classList.toggle('open');
  });

  // Hotels dropdown: tap to open on touch screens
  document.querySelectorAll('.has-sub > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        link.nextElementSibling.style.display =
          link.nextElementSibling.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  // Popular hotels carousel arrows
  var track = document.getElementById('hotels');
  function step() { return track.querySelector('.hotel').offsetWidth + 20; }
  document.getElementById('next').addEventListener('click', function () {
    track.scrollBy({ left: step(), behavior: 'smooth' });
  });
  document.getElementById('prev').addEventListener('click', function () {
    track.scrollBy({ left: -step(), behavior: 'smooth' });
  });

  // Booking form: set minimum date to today
  var dateInput = document.getElementById('tripDate');
  dateInput.min = new Date().toISOString().split('T')[0];

  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var selects = this.querySelectorAll('select');
    var what = selects[0].value, where = selects[1].value;
    if (where === 'Location') { alert('Please choose a location.'); return; }
    if (!dateInput.value) { alert('Please choose a date.'); return; }
    alert('Searching ' + what + 's in ' + where + ' on ' + dateInput.value);
  });

  // Hero card changes with hotel click (simple demo)
  var heroCard = document.getElementById('heroCard');
  document.querySelectorAll('.hotel').forEach(function (card) {
    card.addEventListener('click', function () {
      heroCard.querySelector('h2').textContent = card.querySelector('a').textContent + ', ' + card.querySelector('p').textContent;
      heroCard.querySelector('b').textContent = card.querySelector('.price').textContent.replace(' ', '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Subscribe form validation
  var subForm = document.getElementById('subForm');
  var subMsg = document.getElementById('subMsg');
  subForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('subEmail').value.trim();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    subMsg.textContent = ok ? 'Thanks for subscribing!' : 'Please enter a valid email address.';
    subMsg.className = 'msg ' + (ok ? 'ok' : 'err');
    if (ok) subForm.reset();
  });
});
