const portsData = {
  ridge: {
    id: "ridge",
    badge: "Port 1 • Mid-Ocean Ridge",
    title: "Mid-Atlantic Ridge (Thingvellir, Iceland)",
    location: "📍 North Atlantic Ocean (64.2559° N, 21.1295° W)",
    attraction:
      "Snorkel or dive right between the North American and Eurasian tectonic plates in Iceland’s crystal-clear Silfra Fissure—one of the only places on Earth where a mid-ocean ridge rises above sea level.",
    science:
      "Deep within the mantle, hot, less-dense rock rises upward due to <strong>convection currents</strong>. As this rising heat pushes beneath the crust, it forces the North American and Eurasian plates apart at a <strong>divergent boundary</strong>. Magma wells up into the gap, cools, and hardens into new basaltic oceanic crust, building an underwater mountain chain.",
    terms: ["Convection Currents", "Divergent Boundary", "Seafloor Spreading", "Magma"],
    coords: [64.2559, -21.1295],
    zoom: 6,
    mapLabel: "Map: Thingvellir National Park & Mid-Atlantic Ridge, Iceland"
  },

  /* 
   Ahhhhhhhh pen pineapple apple pen :O
  */

  
  trench: {
    id: "trench",
    badge: "Port 2 • Ocean Trench",
    title: "The Mariana Trench (Challenger Deep)",
    location: "📍 Western Pacific Ocean (11.3733° N, 142.5917° E)",
    attraction:
      "Board our deep-sea research submersible for an unforgettable descent above the Challenger Deep, the deepest known point in Earth's seabed at nearly 11,000 meters below sea level.",
    science:
      "As mantle rock cools near the surface, <strong>convection currents</strong> sink back toward the core, pulling tectonic plates together at a <strong>convergent boundary</strong>. Here, the older, denser Pacific Plate collides with the lighter Philippine Sea Plate. Because it is heavier, the Pacific Plate bends and plunges downward in a <strong>subduction zone</strong>, carving a deep V-shaped canyon into the ocean floor.",
    terms: ["Convection", "Convergent Boundary", "Subduction Zone", "Density"],
    coords: [11.3733, 142.5917],
    zoom: 5,
    mapLabel: "Map: Mariana Trench in the Western Pacific Ocean"
  },
  volcano: {
    id: "volcano",
    badge: "Port 3 • Volcano",
    title: "Mount Fuji (Honshu, Japan)",
    location: "📍 Honshu Island, Japan (35.3606° N, 138.7274° E)",
    attraction:
      "Take a scenic helicopter flight around Japan's iconic snow-capped stratovolcano and unwind in natural geothermal hot springs heated by magma chambers deep below the crust.",
    science:
      "Driven by mantle <strong>convection</strong>, the dense oceanic Pacific and Philippine plates collide with the continental Eurasian Plate at a <strong>convergent boundary</strong>. As the oceanic crust is forced into the <strong>subduction zone</strong>, extreme heat and pressure melt the rock into magma. Because this magma is less dense than surrounding solid rock, it rises through fractures in the crust and erupts onto the surface, building layers of lava and ash.",
    terms: ["Convection", "Convergent Boundary", "Subduction Zone", "Magma & Lava"],
    coords: [35.3606, 138.7274],
    zoom: 7,
    mapLabel: "Map: Mount Fuji along the Pacific Ring of Fire, Japan"
  },
  mountain: {
    id: "mountain",
    badge: "Port 4 • Mountain Range",
    title: "The Himalayas (Mount Everest Region)",
    location: "📍 Border of Nepal & Tibet (27.9881° N, 86.9250° E)",
    attraction:
      "Dock in the Bay of Bengal and take an overland expedition to the Himalayan foothills for breathtaking views of Mount Everest, Earth's highest mountain above sea level.",
    science:
      "Powerful <strong>convection currents</strong> in the mantle carried the Indo-Australian Plate northward until it slammed into the Eurasian Plate at a <strong>convergent boundary</strong>. Because both plates consist of thick, buoyant continental crust, neither plate easily sinks into a <strong>subduction zone</strong>. Instead, the colliding crust crumples, folds, and pushes upward over millions of years, raising towering mountain peaks.",
    terms: ["Convection Currents", "Convergent Boundary", "Continental Uplift", "Crustal Folding"],
    coords: [27.9881, 86.9250],
    zoom: 6,
    mapLabel: "Map: The Himalayan Mountain Range, Nepal/Tibet"
  }
};

const portDisplay = document.getElementById("port-display");
const tabButtons = document.querySelectorAll(".tab-btn");

function buildPortCardHTML(data) {
  const tagsHTML = data.terms
    .map((term) => `<span class="vocab-tag">${term}</span>`)
    .join("");

  return `
    <article class="port-card">
      <div class="port-info">
        <span class="port-badge">${data.badge}</span>
        <h3>${data.title}</h3>
        <p class="port-location">${data.location}</p>
        
        <div class="info-block">
          <h4>🚢 Cruise Shore Excursion</h4>
          <p>${data.attraction}</p>
        </div>

        <div class="info-block">
          <h4>🌋 How Mantle Convection Formed It</h4>
          <p>${data.science}</p>
        </div>

        <div class="vocab-tags">
          ${tagsHTML}
        </div>
      </div>

      <div class="map-container">
        <div id="map-${data.id}" class="map-box"></div>
        <p class="map-caption">${data.mapLabel}</p>
      </div>
    </article>
  `;
}

function initMap(data) {
  const map = L.map(`map-${data.id}`).setView(data.coords, data.zoom);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  L.marker(data.coords).addTo(map).bindPopup(data.title);
}

function renderPorts(selection) {
  const items = selection === "all" ? Object.values(portsData) : [portsData[selection]];
  portDisplay.innerHTML = items.map((port) => buildPortCardHTML(port)).join("");
  items.forEach((port) => initMap(port));
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPorts(btn.dataset.port);
  });
});

renderPorts("all");
