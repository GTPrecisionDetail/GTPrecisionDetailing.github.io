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
