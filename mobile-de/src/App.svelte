<main
  class="flex flex-col gap-2 justify-start items-start fixed left-0 right-0 bottom-0 bg-white rounded-lg px-6 py-2 mx-3 mb-1 z-5000 b-solid b-gray-500"
>
  <div class="flex gap-3 justify-start">
    <span> { results['title'] } </span>
    <span> { results['subtitle'] } </span>
    
  </div>
  <div class="flex gap-3 w-full">
    {#each ['price', 'engine', 'km', 'reg-year', 'colour'] as k}
      <span>
        { results[k] }
      </span>
    {/each}
    {#each ['cp', 'ac', 'ps', 'cc'] as k}
      {#if k in results}
        <span>
          { k }
        </span>
      {/if} 
    {/each}
    {#each ['acc', 'hud', 'cam', 'pa', 'bsa', 'la', 'hba', 'ind', 'sound', 'traf', 'et', '4x4', 'as', 'keyless', 'sport', 'trailer', 'roof', 'nv'] as k}
      {#if k in results}
        <span>
          { featureTitles[k] ?? k }
        </span>
      {/if} 
    {/each}
    <div class="grow"></div>
    <div class="cursor-pointer active:color-gray" on:click="{onCopy}">
      Copy
    </div>
  </div>
</main>

<script lang="ts">
  console.log('running svelte')
  const results = {} 

  const featuresMap = {
    'ABS': [false],
    'Adaptive cornering lights': [false],
    'Adaptive Cruise Control': [true, 'acc'], //
    'Adaptive lighting': [false],
    'Alarm system': [true, 'alarm'], //
    'All season tyres': [false],
    'Alloy wheels': [false],
    'Ambient lighting': [false],
    'Android Auto': [true], //
    'Apple CarPlay': [true], //
    'Arm rest': [false],
    'Autom. dimming interior mirror': [false],
    'Auxiliary heating': [false],
    'Bi-xenon headlights': [false],
    'Blind spot assist': [true, 'bsa'], //
    'Bluetooth': [false],
    'Cargo barrier': [false],
    'CD player': [false],
    'Central locking': [false],
    'DAB radio': [false],
    'Daytime running lights': [false],
    'Digital cockpit': [true, 'cp'], //
    'Distance warning system': [false],
    'Electric side mirror': [false],
    'Electric tailgate': [true, 'et'], //
    'Electric windows': [false],
    'Emergency brake assist': [false],
    'Emergency call system': [false],
    'ESP': [false],
    'Fatigue warning system': [false],
    'Fog lamp': [false],
    'Fold flat passenger seat': [false],
    'Four wheel drive': [true, '4x4'],
    'Full Service History': [false],
    'Glare-free high beam headlights': [false],
    'Hands-free kit': [false],
    'Head-up display': [true, 'hud'], //
    'Headlight washer system': [false],
    'Heated seats': [true, 'seats'], //
    'Heated windshield': [false],
    'High beam assist': [true, 'hba'], //
    'Hill-start assist': [true, 'ha'], //
    'Immobilizer': [false],
    'Induction charging for smartphones': [true, 'ind'],
    'Integrated music streaming': [false],
    'Isofix': [false],
    'Keyless central locking': [true, 'keyless'], //
    'Lane change assist': [true, 'la'], //
    'Leather steering wheel': [false],
    'LED headlights': [false],
    'LED running lights': [false],
    'Light sensor': [false],
    'Lumbar support': [true],
    'Multifunction steering wheel': [false],
    'Navigation system': [true, 'navi'], //
    'Night vision assist': [true, 'nv'], //
    'Non-smoker vehicle': [false],
    'On-board computer': [false],
    'Panoramic roof': [true, 'roof'], //
    'Particulate filter': [false],
    'Passenger seat Isofix point': [false],
    'Power Assisted Steering': [false],
    'Rain sensor': [false],
    'Sound system': [false],
    'Speed limit control system': [true, 'cc'], //
    'Sport seats': [false],
    'Sports package': [true, 'sport'], //
    'Sports suspension': [true, 'sport'], //
    'Start-stop system': [false],
    'Steel wheels': [false],
    'Summer tyres': [false],
    'Sunroof': [true, 'roof'], //
    'Touchscreen': [false],
    'Traction control': [false],
    'Traffic sign recognition': [true, 'traf'],
    'Trailer coupling, detachable': [true, 'trailer'],
    'Tuner/radio': [false],
    'Tyre pressure monitoring': [false],
    'USB port': [false],
    'Voice control': [false],
    'Warranty': [false],
    'Winter package': [false],
    'Winter tyres': [false],
    'WLAN / WiFi hotspot': [false],
  }

  const selectorsMap = {
    'clim': ['div#climatisation-v'],
    'colour': ['div#color-v'],
    'cubic': ['div#cubicCapacity-v'],
    'fuel': ['div#fuel-v'],
    'km': ['div#mileage-v'],
    'park': ['div#parkAssists-v'],
    'power': ['div#power-v'],
    'price': ['div.main-price-and-rating-row span.h3', p => p.replace(',', '.').replace('€', '') + '€'],
    'reg-year': ['.key-feature--firstRegistration div.key-feature__value'],
    'subtitle': ['div.listing-subtitle'],
    'title': ['div.listing-title .h2'],
  }

  const descriptionMap = {
    'ac': ['automatic air', 'klimaautomatik'],
    'acc': ['adaptive cruise control', 'Stop&Go', 'Distanzregelung'],
    'as': ['adaptive suspension', 'drive select'],
    'alarm': ['alarm'],
    'cam': ['camera', 'Rückfahrkamera'],
    'cp': ['cockpit'],
    'cc': ['cruise control', 'Geschwindigkeitsbegrenzungsanlage'],
    'et': ['electronic tailgate', 'Gepäckraumklappe elekt', 'Elektrische Heckklappe'],
    'la': ['lane assist', 'Spurwechselassistent', 'Side Assist', 'Spurhalteassistent'],
    'hba': ['high beam assist', 'Fernlichtassistent', 'assistenza per proiettori'],
    'hud': ['Head-up-Display'],
    'keyless': ['keyless'],
    'ps': ['parking sensors', 'einparkhilfe', 'ParkDistanceControl', 'APS Plus'],
    'pa': ['Parklenkassistent'],
    'ind': ['induction', 'Phone Box'],
    'seats': ['seat heating', 'sitzheizung'],
    'sound': ['Olufsen', 'B&O', 'Beats'],
  }

  const featureTitles = {
    '4x4': '4x4',
    'ac': 'Automatic climatisation',
    'acc': 'Adaptive Cruise Control',
    'alarm': 'Alarm System',
    'as': 'Adaptive Suspension',
    'bsa': 'Blind Spot Assist',
    'cam': 'Camera',
    'cc': 'Cruise Control',
    'cockpit': 'Digital Cockpit',
    'et': 'Electric Tailgate',
    'ha': 'Hill Assist',
    'hba': 'High Beam Assist',
    'hud': 'Head Up Display',
    'ind': 'Induction',
    'keyless': 'Keyless',
    'la': 'Lane Assist',
    'nv': 'Night Vision',
    'pa': 'Self steering parking',
    'ps': 'Parking sensors',
    'seats': 'Heated Seats',
    'sound': 'Sound System',
    'sport': '!Sport Suspension!',
    'traf': 'Trafic Sign Recognition',
    'roof': 'Panoramic Roof',
  }

  Object.keys(selectorsMap).forEach(k => {
    const [selector, transform = a => a] = selectorsMap[k]
    const result = document.querySelector(selector)?.innerHTML?.replaceAll('&nbsp;', ' ').replaceAll('&amp;', '&')
    results[k] = transform(result)
    console.log(results[k])
  })

  if (results['clim']?.toLowerCase().includes('auto')) results['ac'] = 'ac'
  if (results['park']?.toLowerCase().includes('rear')) results['ps'] = 'ps'
  if (results['park']?.toLowerCase().includes('camera')) results['cam'] = 'cam'
  if (results['park']?.toLowerCase().includes('self')) results['pa'] = 'pa'

  Array.from(document.querySelectorAll('#features div.g-col-6')).forEach(f => {
    const feature = f.textContent
    if (feature in featuresMap) {
      const [showFeature, featureName] = featuresMap[feature]
      if (!showFeature) (f as HTMLElement).style.color = '#CDCDCD'
      if (featureName) results[featureName] = featureName
    }
  })

  const description = document.querySelector('div.description')?.innerHTML?.replaceAll('&nbsp;', ' ')
    .replaceAll('&amp;', '&').replaceAll('-', '').toLowerCase()

  for (const key of Object.keys(descriptionMap)) {
    for (const searchText of descriptionMap[key]) {
      if (description.includes(searchText?.toLowerCase())) results[key] = searchText
    }
  }

  let car
  if (results['title'].toLowerCase().includes('audi')) car = 'audi'

  const cubic = parseInt(results?.['cubic']?.replace('.', ''))
  const horsePower = parseInt(results?.['power']?.match(/\((.*(Hp|PS))\)/)?.[1])
  console.log('cubic', cubic, 'horsePower', horsePower, results?.['power'], results?.['power']?.match(/\((.*(Hp|PS))\)/), 'car', car)
  if (car === 'audi') {
    if (cubic <= 1000) results['engine'] = 'S-Tronic 1.0 TFSI - 115Hp'
    else if (cubic > 1300 && cubic <= 1400) results['engine'] = 'S-Tronic 1.4 TFSI - 150Hp'
    else if (cubic > 1400 && cubic <= 1500) results['engine'] = 'S-Tronic 1.5 TFSI - 150Hp'
    else if (cubic > 1500 && cubic <= 1600) results['engine'] = 'S-Tronic 1.6 TDI - 115Hp'
    else if (cubic > 1900 && cubic <= 2000) {
      if (horsePower === 150) results['engine'] = 'S-Tronic 2.0 TDI - 150Hp'
      else if (horsePower === 190) {
        if (results['fuel']?.toLowerCase().includes('petrol')) results['engine'] = 'S-Tronic 2.0 TFSI - 190Hp'
        else results['engine'] = 'S-Tronic 2.0 TDI - 190Hp'
      }
      else results['engine'] = 'unknown engine'
    }
    else results['engine'] = 'unknown engine'
  }

  if ('acc' in results) results['cc'] = 'acc'

  const finalTransformations = {
    'price': p => p?.replaceAll('.', ''),
    'engine': e => e,
    'km': p => p?.match(/[0-9]+\./g)[0].replace('.', ''),
    'reg-year': y => y,
    'colour': c => c?.replace('Metallic', '').trim(),
  }

  const copyResult = {
    audi: ['price', '', '', '', 'engine', '', 'km', 'reg-year', 'colour', 'cp', 'ac', 'ps', 'cc', 'acc', 'hud', 'cam', 'pa', 'bsa', 'la', 'hba', 'ind', 'sound', 'traf', 'et', '4x4', 'as', 'keyless', 'sport', 'trailer', 'roof', 'nv']
  }

  function onCopy() {
    const text = (copyResult?.[car] ?? []).map(k => {
      if (k in results) return (k in finalTransformations) ? finalTransformations[k](results[k]) : k
      else return ''
    }).join('\t')
    navigator.clipboard.writeText(window.location.href + '\t' + text)
  }
</script>
