import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  OverlayView,
  Autocomplete,
} from "@react-google-maps/api";
import StoresContext from "../../context/Stores/StoresContext";
import { useGoogleMaps } from "../../context/GoogleMaps/GoogleMapsProvider";
import { renderToStaticMarkup } from "react-dom/server";
import StoreIcon from "../../components/icons/StoreIcon";
import LocationIcon from "../../components/icons/LocationIcon";
import PaperIcon from "../../components/icons/PaperIcon";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SendIcon from "@mui/icons-material/Send";
const containerStyle = { width: "100%", height: "600px", borderRadius: "20px" };
const centerDefault = { lat: 19.4326, lng: -99.1332 };

function DistributionMap() {
  const { isLoaded, loadError } = useGoogleMaps();
  const { getStoresNearby, stores } = useContext(StoresContext);

  const [userLocation, setUserLocation] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [mapCenter, setMapCenter] = useState(centerDefault);
  const [map, setMap] = useState(null); // Referencia al mapa para moverlo
  const [autocomplete, setAutocomplete] = useState(null);
  //Para habilitar la funcion buscar dentro de esta zona
  const [showSearchHere, setShowSearchHere] = useState(false);
  const [currentBounds, setCurrentBounds] = useState(null); // Para guardar donde está mirando el usuario
  const [openAlert, setOpenAlert] = useState(false);
  // Icono de Tienda Personalizado
  const customShopIcon = useMemo(() => {
    if (!isLoaded) return null;
    const svgString = renderToStaticMarkup(<StoreIcon width={40} />);
    const svgUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`;
    return {
      url: svgUrl,
      scaledSize: new window.google.maps.Size(40, 40),
      anchor: new window.google.maps.Point(20, 40),
    };
  }, [isLoaded]);

  // Cargar tiendas al mover el centro
  const loadStores = useCallback((lat, lng) => {
    getStoresNearby(lat, lng);
  }, []);

  // Al cargar el mapa por primera vez
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserLocation(coords);
          setMapCenter(coords);
          loadStores(coords.lat, coords.lng);
        },
        () => loadStores(centerDefault.lat, centerDefault.lng),
      );
    }
  }, [loadStores]);

  // --- Lógica del Buscador ---
  const onLoadAutocomplete = (auto) => setAutocomplete(auto);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newPos = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        map.panTo(newPos); // Mueve el mapa suavemente
        setMapCenter(newPos);
        loadStores(newPos.lat, newPos.lng); // Busca tiendas en la nueva zona
      }
    }
  };
  // Función para centrar el mapa en el usuario
  const handleRecenter = () => {
    if (userLocation && map) {
      map.panTo(userLocation);
      setMapCenter(userLocation);
      // Opcional: Recargar tiendas en esa zona
      loadStores(userLocation.lat, userLocation.lng);
    } else {
      alert("No hemos podido detectar tu ubicación actual");
    }
  };
  const onMapDrag = () => {
    if (!showSearchHere) setShowSearchHere(true);
  };

  const handleSearchHere = async () => {
    if (map) {
      const newCenter = map.getCenter();
      const lat = newCenter.lat();
      const lng = newCenter.lng();

      setMapCenter({ lat, lng });

      // Asumiendo que getStoresNearby es una promesa o actualiza el estado
      const result = await getStoresNearby(lat, lng);

      // Si el resultado viene vacío (puedes validar stores.length después del fetch)
      setShowSearchHere(false);
    }
  };
  const mapStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    }, // Quita iconos de semáforos/señales
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }], // Carreteras blancas para un look limpio
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#cad2d3" }], // Agua en un tono más suave
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { color: "#9cd2fa" }, // Un azul cielo suave y moderno
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        { color: "#74a7cb" }, // Color del texto de los ríos/mares
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }], // Suelo gris muy claro para que el agua resalte
    },
  ];
  useEffect(() => {
    // Si buscamos y el resultado es 0 tiendas, disparamos la alerta
    if (stores.length === 0 && isLoaded) {
      setOpenAlert(true);
    }
  }, [stores]);

  if (loadError) return <div style={{ padding: 20 }}>⚠️ Error en el mapa</div>;
  if (!isLoaded) return <div style={{ padding: 20 }}>Iniciando sistema...</div>;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pulse-live {
          0% { box-shadow: 0 0 0 0 rgba(229, 56, 136, 0.7); }
          70% { box-shadow: 0 0 0 12px rgba(229, 56, 136, 0); }
          100% { box-shadow: 0 0 0 0 rgba(229, 56, 136, 0); }
        }
        .live-marker {
          width: 14px; height: 14px;
          background-color: #E53888;
          border-radius: 50%;
          border: 2px solid white;
          animation: pulse-live 1.8s infinite;
          transform: translate(-50%, -50%);
        }
        .search-box-container {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: 90%;
          max-width: 450px;
        }
        .search-input {
          width: 100%;
          height: 50px;
          padding: 0 20px;
          border-radius: 25px;
          border: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          font-size: 16px;
          outline: none;
          background: white;
        }
          .recenter-btn {
          position: absolute;
          bottom: 120px;
          right: 10px;
          z-index: 10;
          width: 40px;
          height: 40px;
          background-color: white;
          border: none;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .recenter-btn:hover {
          transform: scale(1.1);
          background-color: #f8f8f8;
        }
        .recenter-icon {
          color: #E53888;
          font-size: 24px;
        }
          .search-here-btn {
          position: absolute;
          top: 85px; /* Debajo del buscador */
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          background: #FFF;
          color: #E53888;
          border: 2px solid #E53888;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
        }
        .search-here-btn:hover {
          background: #E53888;
          color: white;
        }
      `}</style>

      {/* BUSCADOR FLOTANTE */}
      <div className='search-box-container'>
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type='text'
            placeholder='🔍 Busca tu colonia o ciudad...'
            className='search-input'
          />
        </Autocomplete>
      </div>
      {showSearchHere && (
        <button className='search-here-btn' onClick={handleSearchHere}>
          <span>🔄</span> Buscar en esta zona
        </button>
      )}
      {/* BOTÓN DE RE-CENTRAR */}
      {userLocation && (
        <button
          className='recenter-btn'
          onClick={handleRecenter}
          title='Mi ubicación'
        >
          <span className='recenter-icon'>
            <LocationIcon width={25} />
          </span>
          {/* Puedes usar un emoji de mira o un icono de SVG */}
        </button>
      )}
      {stores.length === 0 && !showSearchHere && (
        <div
          style={{
            position: "absolute",
            top: "140px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "10px 20px",
            borderRadius: "20px",
            border: "1px solid #E53888",
            color: "#E53888",
            fontWeight: "bold",
            zIndex: 10,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          ¡Vaya! Aún no hay compañeras en esta zona 🌸
        </div>
      )}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={15}
        onLoad={(mapInstance) => setMap(mapInstance)}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
          tilt: 45, // Inclinación para el efecto 3D
          heading: 0,
          mapTypeId: "roadmap",
        }}
        onDragStart={() => setShowSearchHere(true)} // Mostrar botón al empezar a mover
      >
        {/* Ubicación Live Rosa */}
        {userLocation && (
          <OverlayView
            position={userLocation}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className='live-marker' />
          </OverlayView>
        )}

        {/* Tienditas Rosas */}
        {stores.map((store) => (
          <MarkerF
            key={store.id}
            position={{
              lat: parseFloat(store.latitude),
              lng: parseFloat(store.longitude),
            }}
            icon={customShopIcon}
            // Si esta es la tienda seleccionada, que dé un pequeño brinco al abrirse
            animation={
              selectedStore?.id === store.id
                ? window.google.maps.Animation.BOUNCE
                : null
            }
            onClick={() => setSelectedStore(store)}
          />
        ))}

        {selectedStore && (
          <InfoWindowF
            position={{
              lat: parseFloat(selectedStore.latitude),
              lng: parseFloat(selectedStore.longitude),
            }}
            onCloseClick={() => setSelectedStore(null)}
          >
            <div style={{ padding: "8px", maxWidth: "220px", color: "#333" }}>
              <h3
                style={{
                  marginTop: 2,
                  color: "#E53888",
                  fontSize: "16px",
                }}
              >
                {selectedStore.name}
              </h3>
              <p style={{ fontSize: "12px", margin: "0 0 12px" }}>
                {selectedStore.address}
              </p>
              <Grid
                container
                spacing={2}
                style={{ display: "flex", gap: "8px" }}
              >
                <Grid size={12}>
                  <Link
                    to={`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.latitude},${selectedStore.longitude}`}
                    target='_blank'
                  >
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{ bgcolor: "#d82e7a", borderRadius: "12px" }}
                      startIcon={<SendIcon />}
                    >
                      Ir Ahora
                    </Button>
                  </Link>
                </Grid>
                <Grid size={12}>
                  <Link
                    to={`https://wa.me/${selectedStore.phone}?text=${encodeURIComponent("Hola, me interesa adquirir productos, ¿puedo acudir ahora?")}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Button
                      fullWidth
                      variant='contained'
                      sx={{ bgcolor: "#23C962", borderRadius: "12px" }}
                      startIcon={<WhatsAppIcon />}
                    >
                      WhatsApp
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
}

const btnStyle = (color, isLink = false) => ({
  flex: 1,
  backgroundColor: color,
  color: "white",
  border: "none",
  padding: "10px 5px",
  borderRadius: "8px",
  fontSize: "11px",
  fontWeight: "bold",
  textAlign: "center",
  cursor: "pointer",
  textDecoration: "none",
  display: isLink ? "inline-block" : "block",
});

export default DistributionMap;
