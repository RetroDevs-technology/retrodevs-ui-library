import { Button } from "@/components/ui"
import CustomGooglePlaces, { type Place } from "@/components/map/custom-google-places"
import type { Coordinates } from "@/components/map/map.model"
import { MapPin, Navigation, Loader2 } from "lucide-react"
import { useState } from "react"

interface DistanceResult {
  distanceMeters: number
  distanceMiles: number
  distanceKilometers: number
  durationSeconds: number
  durationText: string
  routeSummary: string
}

export function DistanceCalculator() {
  const [originPlace, setOriginPlace] = useState<Place | null>(null)
  const [destinationPlace, setDestinationPlace] = useState<Place | null>(null)
  const [originCoords, setOriginCoords] = useState<Coordinates | null>(null)
  const [destinationCoords, setDestinationCoords] = useState<Coordinates | null>(null)
  const [result, setResult] = useState<DistanceResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const getPlaceCoordinates = async (place: Place): Promise<Coordinates | null> => {
    // First try to use location if available
    if (place.location) {
      return {
        lat: place.location.lat,
        lng: place.location.lng,
      }
    }

    // Wait for Google Maps API to be loaded
    if (!window.google?.maps) {
      // Wait up to 5 seconds for Google Maps to load
      let attempts = 0
      while (!window.google?.maps && attempts < 50) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        attempts++
      }
    }

    if (!window.google?.maps) {
      console.error("Google Maps API not loaded")
      return null
    }

    try {
      // Ensure Geocoder is available
      if (!window.google.maps.Geocoder) {
        await window.google.maps.importLibrary("geocoding")
      }

      const geocoder = new window.google.maps.Geocoder()

      return new Promise<Coordinates | null>((resolve) => {
        geocoder.geocode(
          { placeId: place.place_id },
          (
            results: google.maps.GeocoderResult[] | null,
            status: google.maps.GeocoderStatus,
          ) => {
            if (status === window.google.maps.GeocoderStatus.OK && results?.[0]?.geometry?.location) {
              resolve({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              })
            } else {
              console.error("Geocoding failed:", status)
              resolve(null)
            }
          },
        )
      })
    } catch (err) {
      console.error("Error geocoding place:", err)
      return null
    }
  }

  const handleOriginSelect = async (place: Place | null) => {
    setOriginPlace(place)
    setError(null)
    setResult(null)

    if (place) {
      const coords = await getPlaceCoordinates(place)
      setOriginCoords(coords)
    } else {
      setOriginCoords(null)
    }
  }

  const handleOriginLocationChange = (postgisPoint: string) => {
    // Parse PostGIS point format: "POINT(lng lat)"
    const match = postgisPoint.match(/POINT\(([^)]+)\)/)
    if (match) {
      const [lng, lat] = match[1].split(" ").map(Number)
      setOriginCoords({ lat, lng })
    }
  }

  const handleDestinationSelect = async (place: Place | null) => {
    setDestinationPlace(place)
    setError(null)
    setResult(null)

    if (place) {
      const coords = await getPlaceCoordinates(place)
      setDestinationCoords(coords)
    } else {
      setDestinationCoords(null)
    }
  }

  const handleDestinationLocationChange = (postgisPoint: string) => {
    // Parse PostGIS point format: "POINT(lng lat)"
    const match = postgisPoint.match(/POINT\(([^)]+)\)/)
    if (match) {
      const [lng, lat] = match[1].split(" ").map(Number)
      setDestinationCoords({ lat, lng })
    }
  }

  const handleCalculate = async () => {
    if (!originCoords || !destinationCoords) {
      setError("Please select both origin and destination addresses")
      return
    }

    setIsCalculating(true)
    setError(null)
    setResult(null)

    try {
      // Wait for Google Maps API to be loaded
      if (!window.google?.maps) {
        let attempts = 0
        while (!window.google?.maps && attempts < 50) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          attempts++
        }
      }

      if (!window.google?.maps) {
        throw new Error("Google Maps API not loaded. Please refresh the page.")
      }

      // Use Google Maps JavaScript API DirectionsService (no CORS issues)
      const directionsService = new window.google.maps.DirectionsService()

      const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
        directionsService.route(
          {
            origin: { lat: originCoords.lat, lng: originCoords.lng },
            destination: { lat: destinationCoords.lat, lng: destinationCoords.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (
            result: google.maps.DirectionsResult | null,
            status: google.maps.DirectionsStatus,
          ) => {
            if (status === window.google.maps.DirectionsStatus.OK && result) {
              resolve(result)
            } else {
              reject(new Error(`Directions request failed: ${status}`))
            }
          },
        )
      })

      // Calculate total distance from all legs
      const totalDistanceMeters = result.routes[0].legs.reduce(
        (sum, leg) => sum + (leg.distance?.value || 0),
        0,
      )

      // Calculate total duration from all legs
      const totalDurationSeconds = result.routes[0].legs.reduce(
        (sum, leg) => sum + (leg.duration?.value || 0),
        0,
      )

      // Convert to miles and kilometers
      const distanceMiles = totalDistanceMeters / 1609.34
      const distanceKilometers = totalDistanceMeters / 1000

      // Format duration text
      const durationText = formatDuration(totalDurationSeconds)

      setResult({
        distanceMeters: totalDistanceMeters,
        distanceMiles,
        distanceKilometers,
        durationSeconds: totalDurationSeconds,
        durationText,
        routeSummary: result.routes[0].summary || "Route calculated",
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to calculate distance. Please try again.",
      )
    } finally {
      setIsCalculating(false)
    }
  }

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0 && minutes > 0) {
      return `${hours} hr ${minutes} min`
    }
    if (hours > 0) {
      return `${hours} hr`
    }
    if (minutes > 0) {
      return `${minutes} min`
    }
    return "Less than 1 min"
  }

  const canCalculate = originCoords && destinationCoords

  return (
    <div className="flex flex-col h-full p-4 gap-4 overflow-y-auto overflow-x-hidden">
      <div className="flex items-center gap-2 mb-2 flex-shrink-0">
        <Navigation className="w-5 h-5 text-primary flex-shrink-0" />
        <h3 className="font-semibold text-lg">Distance Calculator</h3>
      </div>

      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex flex-col gap-2">
          <label htmlFor="origin-address" className="text-sm font-medium text-gray-700">
            Origin Address
          </label>
          <CustomGooglePlaces
            apiKey={apiKey}
            value={originPlace}
            onChange={handleOriginSelect}
            onLocationChange={handleOriginLocationChange}
            placeholder="Enter origin address"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="destination-address" className="text-sm font-medium text-gray-700">
            Destination Address
          </label>
          <CustomGooglePlaces
            apiKey={apiKey}
            value={destinationPlace}
            onChange={handleDestinationSelect}
            onLocationChange={handleDestinationLocationChange}
            placeholder="Enter destination address"
            className="w-full"
          />
        </div>

        <Button
          type="button"
          onClick={handleCalculate}
          disabled={!canCalculate || isCalculating}
          className="w-full flex-shrink-0">
          {isCalculating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 mr-2" />
              Calculate Distance
            </>
          )}
        </Button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex-shrink-0">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3 flex-shrink-0">
            <h4 className="font-semibold text-lg mb-3">Distance Results</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Distance:</span>
                <span className="text-sm font-medium text-gray-900">
                  {result.distanceMiles.toFixed(2)} miles ({result.distanceKilometers.toFixed(2)} km)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Estimated Time:</span>
                <span className="text-sm font-medium text-gray-900">
                  {result.durationText}
                </span>
              </div>
              {result.routeSummary && (
                <div className="flex justify-between items-start gap-2 pt-2 border-t border-gray-300">
                  <span className="text-sm text-gray-700">Route:</span>
                  <span className="text-sm text-gray-900 text-right">
                    {result.routeSummary}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {!originPlace && !destinationPlace && !result && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
            <MapPin className="w-12 h-12 mb-3 text-gray-300" />
            <p className="font-medium text-gray-600 mb-1">Calculate Distance</p>
            <p className="text-sm text-gray-400 text-center">
              Enter origin and destination addresses to calculate the driving distance and
              estimated travel time
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

