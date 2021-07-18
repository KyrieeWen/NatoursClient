/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import mapboxgl from '!mapbox-gl'

mapboxgl.accessToken =
  'pk.eyJ1Ijoia3lyaWVlIiwiYSI6ImNrcWxyeWVzbDA2bXIybm9hOWZhenJzdngifQ.b64245OiRK11lY8o64cjYQ'

export default class Mapbox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      lng: this.props.lng,
      lat: this.props.lat,
      zoom: this.props.zoom,
      locations: this.props.locations,
    }
    this.mapContainer = React.createRef()
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/kyriee/ckqlyejrz01ug17ktnzh6w854',
      center: [this.props.lng, this.props.lat],
      zoom: 8,
      scrollZoom: true,
    })

    // Create marker
    const bounds = new mapboxgl.LngLatBounds()

    this.state.locations.forEach((loc) => {
      // Add marker
      const el = document.createElement('div')
      el.className = 'marker'

      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(loc.coordinates)
        .addTo(map)

      // Add popup
      new mapboxgl.Popup({
        offset: 30,
      })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map)

      // Extend map bounds to include current location
      bounds.extend(loc.coordinates)
    })

    map.fitBounds(bounds)

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      })
    })
  }
  render() {
    const { lng, lat, zoom } = this.state
    return (
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={this.mapContainer} className="section-map"></div>
      </div>
    )
  }
}
