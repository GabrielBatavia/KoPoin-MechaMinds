import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebView } from "react-native-webview";
import { colors, radii, shadows } from "../theme";

export type MapMarkerItem = {
  id: string;
  title: string;
  subtitle?: string;
  latitude: number;
  longitude: number;
  distanceLabel?: string;
  category?: string;
};

type OpenStreetMapViewerProps = {
  latitude: number;
  longitude: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  markers?: MapMarkerItem[];
  showNearbyTeams?: boolean;
  height?: number;
  interactive?: boolean;
};

export function OpenStreetMapViewer({
  latitude,
  longitude,
  onLocationSelect,
  markers = [],
  showNearbyTeams = true,
  height = 240,
  interactive = true
}: OpenStreetMapViewerProps) {
  const webViewRef = useRef<WebView>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { box-sizing: border-box; }
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    #map {
      width: 100%;
      height: 100vh;
      background: #E8F0EE;
    }
    .leaflet-control-attribution {
      font-size: 9px !important;
      background: rgba(255,255,255,0.75) !important;
    }
    /* User pulsing marker */
    .user-marker-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
    }
    .user-marker-pulse {
      position: absolute;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(11, 96, 86, 0.25);
      animation: pulse 1.8s infinite ease-out;
    }
    .user-marker-core {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #0B6056;
      border: 3px solid #FFFFFF;
      box-shadow: 0 2px 6px rgba(0,0,0,0.35);
      z-index: 2;
    }
    @keyframes pulse {
      0% { transform: scale(0.6); opacity: 0.9; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    /* Team markers */
    .team-badge {
      background: #112A26;
      color: #FFFFFF;
      padding: 3px 7px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      border: 1.5px solid #20A090;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      white-space: nowrap;
      text-align: center;
      transform: translateY(-8px);
    }
    .team-badge span {
      color: #72E4D0;
      font-size: 10px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', {
      center: [${latitude}, ${longitude}],
      zoom: 15,
      zoomControl: ${interactive ? "true" : "false"},
      dragging: ${interactive ? "true" : "false"},
      touchZoom: ${interactive ? "true" : "false"},
      scrollWheelZoom: ${interactive ? "true" : "false"},
      doubleClickZoom: ${interactive ? "true" : "false"}
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    var userIcon = L.divIcon({
      className: '',
      html: '<div class="user-marker-container"><div class="user-marker-pulse"></div><div class="user-marker-core"></div></div>',
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    var userMarker = L.marker([${latitude}, ${longitude}], { icon: userIcon, draggable: ${interactive ? "true" : "false"} }).addTo(map);
    userMarker.bindPopup('<b>Titik Kamu</b><br>Geser atau klik peta untuk sesuaikan').openPopup();

    function notifyLocation(lat, lng) {
      var payload = JSON.stringify({ type: 'SELECT_LOCATION', latitude: lat, longitude: lng });
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(payload);
      } else if (window.parent && window.parent.postMessage) {
        window.parent.postMessage(payload, '*');
      }
    }

    if (${interactive ? "true" : "false"}) {
      map.on('click', function(e) {
        userMarker.setLatLng(e.latlng);
        notifyLocation(e.latlng.lat, e.latlng.lng);
      });

      userMarker.on('dragend', function(e) {
        var pos = userMarker.getLatLng();
        notifyLocation(pos.lat, pos.lng);
      });
    }

    var teamMarkers = ${JSON.stringify(markers)};
    if (${showNearbyTeams ? "true" : "false"} && teamMarkers && teamMarkers.length > 0) {
      teamMarkers.forEach(function(item) {
        var teamIcon = L.divIcon({
          className: '',
          html: '<div class="team-badge">' + item.title + ' <span>' + (item.distanceLabel || '') + '</span></div>',
          iconSize: [110, 28],
          iconAnchor: [55, 14]
        });
        var m = L.marker([item.latitude, item.longitude], { icon: teamIcon }).addTo(map);
        if (item.subtitle) {
          m.bindPopup('<b>' + item.title + '</b><br>' + item.subtitle);
        }
      });
    }

    window.updateMapCenter = function(newLat, newLng) {
      userMarker.setLatLng([newLat, newLng]);
      map.flyTo([newLat, newLng], 16, { animate: true, duration: 1.2 });
    };
  </script>
</body>
</html>
  `;

  // Sync webview/iframe when latitude or longitude changes from outside
  useEffect(() => {
    if (!isLoaded) return;

    if (Platform.OS === "web" && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ type: "UPDATE_CENTER", latitude, longitude }),
        "*"
      );
    } else if (webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `if (window.updateMapCenter) { window.updateMapCenter(${latitude}, ${longitude}); } true;`
      );
    }
  }, [latitude, longitude, isLoaded]);

  // Handle messages from Web / Webview
  const handleMessagePayload = (dataStr: string) => {
    try {
      const data = JSON.parse(dataStr);
      if (data.type === "SELECT_LOCATION" && onLocationSelect) {
        onLocationSelect(data.latitude, data.longitude);
      }
    } catch {
      // ignore parse errors
    }
  };

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const listener = (event: MessageEvent) => {
      if (typeof event.data === "string") {
        handleMessagePayload(event.data);
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [onLocationSelect]);

  const WebViewComp = WebView as any;

  return (
    <View style={[styles.container, { height }]}>
      {Platform.OS === "web" ? (
        <iframe
          ref={iframeRef}
          srcDoc={htmlContent}
          style={{ width: "100%", height: "100%", border: "none" }}
          onLoad={() => setIsLoaded(true)}
        />
      ) : (
        <WebViewComp
          ref={webViewRef}
          source={{ html: htmlContent }}
          style={styles.webview}
          onLoadEnd={() => setIsLoaded(true)}
          onMessage={(e: any) => handleMessagePayload(e?.nativeEvent?.data)}
          scrollEnabled={false}
        />
      )}
      {!isLoaded && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="small" color={colors.turquoise} />
          <Text style={styles.loaderText}>Memuat OpenStreetMap...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: radii.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(32, 160, 144, 0.18)",
    backgroundColor: "#E8F0EE",
    position: "relative",
    ...shadows.card
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent"
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(244, 248, 247, 0.85)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  loaderText: {
    fontSize: 13,
    color: colors.slate,
    fontWeight: "500"
  }
});
