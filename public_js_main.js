// Fetch and update sensor data on the home page
function refreshSensorData() {
    fetch('/api/sensor-data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('soilMoisture').textContent = data.soilMoisture;
            document.getElementById('temperature').textContent = data.temperature;
            document.getElementById('humidity').textContent = data.humidity;
            document.getElementById('pumpStatus').textContent = data.pumpStatus;
        })
        .catch(() => {
            document.getElementById('soilMoisture').textContent = "--";
            document.getElementById('temperature').textContent = "--";
            document.getElementById('humidity').textContent = "--";
            document.getElementById('pumpStatus').textContent = "--";
        });
}
if (document.getElementById('sensor-section')) {
    // Initial load
    refreshSensorData();
    // Auto-refresh every 10 sec
    setInterval(refreshSensorData, 10000);
}

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = contactForm.name.value;
        const email = contactForm.email.value;
        const message = contactForm.message.value;
        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        })
        .then(r => r.json())
        .then(res => {
            document.getElementById('formMessage').textContent = res.message || "Message sent!";
            contactForm.reset();
        })
        .catch(() => {
            document.getElementById('formMessage').textContent = "Error sending message.";
        });
    });
}