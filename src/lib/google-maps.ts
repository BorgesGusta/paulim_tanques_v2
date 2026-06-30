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
