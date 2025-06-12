import L from 'leaflet'

setTimeout(() => {
  const map = L.map('map').setView([19.0413, -98.2062], 13) // Puebla

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  L.marker([19.0413, -98.2062])
    .addTo(map)
    .bindPopup('GUDAS Studio - Puebla')
    .openPopup()
}, 0)
