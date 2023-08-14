import React, {useState, useRef, useEffect}  from "react";
import { connect } from "react-redux";
import "./earth.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

function Earth ({token, longitude, latitude, zoomRatio}) {   
    
    mapboxgl.accessToken = token
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [marker, setMarker] = useState(null)
    const [lng, setLng] = useState(longitude);
    const [lat, setLat] = useState(latitude);
    const [Zoom, setZoom] = useState(zoomRatio);
    
    const [cursorClass, setCursorClass] = useState('btn')
    const [location, setLocation] = useState({
        latitude: '',
        longitude: ''
    })


    useEffect(()=>{
        if (map .current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: Zoom
        })
        map.current.on('load', ()=>{
            map.current.addSource('countries', {
                'type': 'geojson',
                'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
            })
            map.current.on('move',()=>{
                setLat(map.current.getCenter().lat.toFixed(6));
                setLng(map.current.getCenter().lng.toFixed(6));
            })
            
        map.current.on('mousemove', (e) =>{
            // create new Location
            const currentLocation = {...location, latitude: e.lngLat.lat, longitude: e.lngLat.lng}
            setLocation(currentLocation)
            console.log(currentLocation)
        })
        
    })
    })  
    
        const addCountryMarker = (e)=>{
            if(!map) return;
            setCursorClass(cursorClass === 'btn' ? 'btn btn-warning' : 'btn');
        }
        
            return(
                <div className="row">
                        <div className="card">
                            <div className="overlay">
                                <h2>Location</h2>
                                <hr/>
                                <p>Longitude: <b>{lng}</b> </p>
                                <p>Latitude: <b>{lat}</b> </p>
                            </div>
                    </div>
                    <div className="card-2">
                            <div className="functionality row">
                                <button className={cursorClass} onClick={addCountryMarker}>Add Marker</button>
                                <button className="removeMarker btn btn-white ">Clear</button>
                                <button className="clear btn">Remove Marker </button>
                            </div>
                    </div>
                    <div ref={mapContainer} className="map-container" />

                </div>
                )
                
            }
            
            const mapStateToProps = (state) =>{
                return{
                    token: state.mapReducer.mapBoxToken,
                    longitude: state.mapReducer.initialViewPoint.longitude,
                    latitude: state.mapReducer.initialViewPoint.latitude,
                    zoomRatio: state.mapReducer.initialViewPoint.zoom
            }
            
        }
        export default connect(mapStateToProps)(Earth)
        

