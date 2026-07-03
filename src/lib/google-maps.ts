declare global {
  interface Window {
    google: typeof google
    initGoogleMaps?: () => void
  }
}

let loadPromise: Promise<void> | null = null

export function loadGoogleMaps(): Promise<void> {
  if (loadPromise) return loadPromise
  if (typeof window.google !== 'undefined') return Promise.resolve()

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
  if (!apiKey) {
    loadPromise = Promise.reject(new Error('VITE_GOOGLE_MAPS_API_KEY not set'))
    return loadPromise
  }

  loadPromise = new Promise((resolve, reject) => {
    window.initGoogleMaps = () => resolve()
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps&loading=async`
    script.onerror = () => reject(new Error('Failed to load Google Maps'))
    document.head.appendChild(script)
  })

  return loadPromise
}

export function initAutocomplete(
  input: HTMLInputElement,
  onPlace: (address: string, lat: number, lng: number) => void,
): () => void {
  const autocomplete = new window.google.maps.places.Autocomplete(input, {
    fields: ['formatted_address', 'geometry'],
    componentRestrictions: { country: 'br' },
  })

  const listener = autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    const lat = place.geometry?.location?.lat()
    const lng = place.geometry?.location?.lng()
    if (place.formatted_address && lat != null && lng != null) {
      onPlace(place.formatted_address, lat, lng)
    }
  })

  return () => window.google.maps.event.removeListener(listener)
}

export function initCityAutocomplete(
  input: HTMLInputElement,
  onPlace: (city: string, state: string) => void,
): () => void {
  const autocomplete = new window.google.maps.places.Autocomplete(input, {
    fields: ['address_components'],
    types: ['(cities)'],
    componentRestrictions: { country: 'br' },
  })

  const listener = autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    const components = place.address_components ?? []
    const cityComponent =
      components.find((c) => c.types.includes('locality')) ??
      components.find((c) => c.types.includes('administrative_area_level_2'))
    const stateComponent = components.find((c) =>
      c.types.includes('administrative_area_level_1'),
    )
    if (cityComponent && stateComponent) {
      onPlace(cityComponent.long_name, stateComponent.short_name)
    }
  })

  return () => window.google.maps.event.removeListener(listener)
}

export function createMapWithMarker(
  container: HTMLElement,
  center: { lat: number; lng: number },
  onDrag: (lat: number, lng: number) => void,
): { map: google.maps.Map; setPosition: (lat: number, lng: number) => void } {
  const map = new window.google.maps.Map(container, {
    center,
    zoom: 13,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  })

  const marker = new window.google.maps.Marker({
    map,
    position: center,
    draggable: true,
  })

  marker.addListener('dragend', () => {
    const position = marker.getPosition()
    if (position) onDrag(position.lat(), position.lng())
  })

  function setPosition(lat: number, lng: number) {
    const position = { lat, lng }
    marker.setPosition(position)
    map.panTo(position)
  }

  return { map, setPosition }
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const geocoder = new window.google.maps.Geocoder()
  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        resolve(results[0].formatted_address)
      } else {
        reject(new Error(`Geocoder failed: ${status}`))
      }
    })
  })
}
