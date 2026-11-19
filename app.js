const portsData = {
  ridge: {
    id: "ridge",
    badge: "Port 1 • Mid-Ocean Ridge",
    title: "[PLACEHOLDER: Name of Real-Life Mid-Ocean Ridge, e.g., Mid-Atlantic Ridge, Iceland]",
    location: "📍 [PLACEHOLDER: Ocean/Country Location & Coordinates]",
    attraction:
      "[PLACEHOLDER: Describe a fun fictional cruise shore excursion passengers can do at this Mid-Ocean Ridge.]",
    science:
      "[PLACEHOLDER: Explain how this Mid-Ocean Ridge formed. Be sure to mention rising mantle CONVECTION currents, magma pushing up, and plates pulling apart at a DIVERGENT BOUNDARY.]",
    terms: ["Convection", "Divergent Boundary", "[PLACEHOLDER: 3rd Vocab Term]"],
    coords: [64.2559, -21.1295],
    zoom: 6,
    mapLabel: "[PLACEHOLDER: Map Caption for Your Mid-Ocean Ridge Location]"
  },  
  trench: {
    id: "trench",
    badge: "Port 2 • Ocean Trench",
    title: "[PLACEHOLDER: Name of Real-Life Ocean Trench, e.g., Mariana Trench]",
    location: "📍 [PLACEHOLDER: Ocean Location & Coordinates]",
    attraction:
      "[PLACEHOLDER: Describe a fictional cruise attraction or submersible tour passengers can take at this Trench.]",
    science:
      "[PLACEHOLDER: Explain how this Trench formed. Be sure to mention sinking mantle CONVECTION currents, plates colliding at a CONVERGENT BOUNDARY, and the denser oceanic plate sinking in a SUBDUCTION ZONE.]",
    terms: ["Convection", "Convergent Boundary", "Subduction Zone"],
    coords: [11.3733, 142.5917],
    zoom: 5,
    mapLabel: "[PLACEHOLDER: Map Caption for Your Ocean Trench Location]"
  },
  volcano: {
    id: "volcano",
    badge: "Port 3 • Volcano",
    title: "[PLACEHOLDER: Name of Real-Life Volcano, e.g., Mount Fuji, Japan]",
    location: "📍 [PLACEHOLDER: Country/Region Location & Coordinates]",
    attraction:
      "[PLACEHOLDER: Describe a fictional cruise excursion or sightseeing tour near this Volcano.]",
    science:
      "[PLACEHOLDER: Explain how this Volcano formed. Be sure to mention mantle CONVECTION, plates colliding at a CONVERGENT BOUNDARY, rock melting in a SUBDUCTION ZONE, and magma rising to erupt.]",
    terms: ["Convection", "Convergent Boundary", "Subduction Zone"],
    coords: [35.3606, 138.7274],
    zoom: 7,
    mapLabel: "[PLACEHOLDER: Map Caption for Your Volcano Location]"
  },
  mountain: {
    id: "mountain",
    badge: "Port 4 • Mountain Range",
    title: "[PLACEHOLDER: Name of Real-Life Mountain Range, e.g., The Himalayas]",
    location: "📍 [PLACEHOLDER: Country/Region Location & Coordinates]",
    attraction:
      "[PLACEHOLDER: Describe a fictional cruise shore excursion or expedition to see these Mountains.]",
    science:
      "[PLACEHOLDER: Explain how this Mountain Range formed. Be sure to mention mantle CONVECTION currents pushing two continental plates together at a CONVERGENT BOUNDARY and why they buckle upward instead of forming a SUBDUCTION ZONE.]",
    terms: ["Convection", "Convergent Boundary", "[PLACEHOLDER: 3rd Vocab Term]"],
    coords: [27.9881, 86.9250],
    zoom: 6,
    mapLabel: "[PLACEHOLDER: Map Caption for Your Mountain Range Location]"
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
