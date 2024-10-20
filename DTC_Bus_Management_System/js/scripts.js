document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    // Initialize Google Maps
    let map;
    let drawingManager;

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 28.6139, lng: 77.209 },
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYLINE,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [google.maps.drawing.OverlayType.POLYLINE],
            },
            polylineOptions: {
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 3,
            },
        });

        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'polylinecomplete', function(polyline) {
            const path = polyline.getPath();
            let coordinates = [];
            for (let i = 0; i < path.getLength(); i++) {
                const latLng = path.getAt(i);
                coordinates.push({ lat: latLng.lat(), lng: latLng.lng() });
            }
            console.log("Route coordinates:", coordinates);
            // Additional code for route saving and overlap detection can be added here.
        });
    }

    if (document.getElementById("map")) {
        initMap();
    }
});
