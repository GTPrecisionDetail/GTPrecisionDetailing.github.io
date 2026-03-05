var carModels = {
  Acura: ['ILX','MDX','RDX','TLX','NSX','Other'],
  Audi: ['A3','A4','A5','A6','A7','A8','Q3','Q5','Q7','Q8','TT','R8','Other'],
  BMW: ['2 Series','3 Series','4 Series','5 Series','7 Series','X1','X3','X5','X6','X7','M3','M5','Other'],
  Buick: ['Enclave','Encore','Envision','LaCrosse','Other'],
  Cadillac: ['CT4','CT5','Escalade','XT4','XT5','XT6','Other'],
  Chevrolet: ['Blazer','Camaro','Colorado','Corvette','Equinox','Malibu','Silverado','Suburban','Tahoe','Traverse','Trax','Other'],
  Chrysler: ['300','Pacifica','Voyager','Other'],
  Dodge: ['Challenger','Charger','Durango','Ram','Other'],
  Ford: ['Bronco','Edge','Escape','Explorer','F-150','F-250','F-350','Maverick','Mustang','Ranger','Other'],
  GMC: ['Acadia','Canyon','Sierra 1500','Sierra 2500','Terrain','Yukon','Other'],
  Honda: ['Accord','Civic','CR-V','HR-V','Odyssey','Passport','Pilot','Ridgeline','Other'],
  Hyundai: ['Elantra','Ioniq 5','Ioniq 6','Kona','Palisade','Santa Fe','Sonata','Tucson','Other'],
  Infiniti: ['Q50','Q60','QX50','QX60','QX80','Other'],
  Jeep: ['Cherokee','Compass','Gladiator','Grand Cherokee','Renegade','Wrangler','Other'],
  Kia: ['Carnival','EV6','K5','Sorento','Soul','Sportage','Stinger','Telluride','Other'],
  Lexus: ['ES','GX','IS','LC','LS','LX','NX','RX','UX','Other'],
  Lincoln: ['Aviator','Corsair','Navigator','Nautilus','Other'],
  Mazda: ['CX-30','CX-5','CX-50','CX-90','Mazda3','Mazda6','MX-5 Miata','Other'],
  'Mercedes-Benz': ['A-Class','C-Class','E-Class','GLC','GLE','GLS','S-Class','AMG GT','Other'],
  Nissan: ['Altima','Armada','Frontier','Kicks','Maxima','Murano','Pathfinder','Rogue','Sentra','Titan','Other'],
  Porsche: ['911','Cayenne','Macan','Panamera','Taycan','Other'],
  Ram: ['1500','2500','3500','ProMaster','Other'],
  Subaru: ['Ascent','BRZ','Crosstrek','Forester','Impreza','Legacy','Outback','WRX','Other'],
  Tesla: ['Model 3','Model S','Model X','Model Y','Cybertruck','Other'],
  Toyota: ['4Runner','Camry','Corolla','GR86','Highlander','Land Cruiser','RAV4','Sequoia','Sienna','Tacoma','Tundra','Other'],
  Volkswagen: ['Atlas','Golf','ID.4','Jetta','Passat','Tiguan','Other'],
  Volvo: ['S60','S90','V60','V90','XC40','XC60','XC90','Other'],
  Other: ['Other']
};

function updateModels() {
  var make = document.getElementById('vehicleMake').value;
  var modelSelect = document.getElementById('vehicleModel');
  modelSelect.innerHTML = '<option value="">Select a model...</option>';
  if (make && carModels[make]) {
    carModels[make].forEach(function(m) {
      var opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      modelSelect.appendChild(opt);
    });
  }
}

var selectedServices = new Set();

function toggleService(el) {
  var name = el.querySelector('h4').textContent.trim();
  var conflictsWithFull = ['Exterior Detail', 'Interior Detail'];
  var isFullDetail = name === 'Full Detail Package';
  var hasFullDetail = selectedServices.has('Full Detail Package');

  if (isFullDetail && !el.classList.contains('selected')) {
    document.querySelectorAll('.svc-desc-item').forEach(function(item) {
      var itemName = item.querySelector('h4').textContent.trim();
      if (conflictsWithFull.includes(itemName)) {
        item.classList.remove('selected');
        selectedServices.delete(itemName);
      }
    });
  }
  if (conflictsWithFull.includes(name) && !el.classList.contains('selected') && hasFullDetail) {
    document.querySelectorAll('.svc-desc-item').forEach(function(item) {
      if (item.querySelector('h4').textContent.trim() === 'Full Detail Package') {
        item.classList.remove('selected');
        selectedServices.delete('Full Detail Package');
      }
    });
  }

  el.classList.toggle('selected');
  if (el.classList.contains('selected')) {
    selectedServices.add(name);
  } else {
    selectedServices.delete(name);
  }
  updateBookingBar();
}

function clearAllServices() {
  selectedServices.clear();
  document.querySelectorAll('.svc-desc-item.selected').forEach(function(el) {
    el.classList.remove('selected');
  });
  updateBookingBar();
}

function updateBookingBar() {
  var bar = document.getElementById('bookingBar');
  var count = document.getElementById('bookingServiceCount');
  var list = document.getElementById('bookingServiceList');
  if (selectedServices.size > 0) {
    bar.classList.add('visible');
    count.textContent = selectedServices.size + ' service(s) selected';
    list.textContent = Array.from(selectedServices).join(' · ');
  } else {
    bar.classList.remove('visible');
  }
  checkBookingReady();
}

function checkBookingReady() {
  var btn = document.getElementById('bookCalendlyBtn');
  if (!btn) return;
  if (selectedServices.size > 0) {
    btn.classList.add('ready');
  } else {
    btn.classList.remove('ready');
  }
}

function openCalendly() {
  window.open('https://calendly.com/gtprecisiondetail/detail', '_blank');
}

function openCalendlyGated() {
  var form = document.getElementById('contactForm');
  var required = form.querySelectorAll('[required]');
  var valid = true;
  required.forEach(function(el) {
    if (!el.value.trim()) {
      valid = false;
      el.style.borderColor = '#e07070';
      el.addEventListener('input', function() { el.style.borderColor = ''; }, { once: true });
    }
  });
  var errorEl = document.getElementById('calendly-error');
  if (!valid) {
    errorEl.style.display = 'block';
    form.querySelector('[required]').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  errorEl.style.display = 'none';
  window.open('https://calendly.com/gtprecisiondetail/detail', '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
  var vehicleMake = document.getElementById('vehicleMake');
  if (vehicleMake) vehicleMake.addEventListener('change', updateModels);

  document.querySelectorAll('.svc-desc-item').forEach(function(el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function() { toggleService(el); });
  });

  var bookCalendlyBtn = document.getElementById('bookCalendlyBtn');
  if (bookCalendlyBtn) bookCalendlyBtn.addEventListener('click', openCalendly);

  var clearBtn = document.querySelector('.booking-clear');
  if (clearBtn) clearBtn.addEventListener('click', clearAllServices);

  var gatedBtn = document.querySelector('.form-submit[type="button"]');
  if (gatedBtn) gatedBtn.addEventListener('click', openCalendlyGated);
});
