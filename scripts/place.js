document.addEventListener('DOMContentLoaded', () => {

    const year = new Date().getFullYear();
    const lastModifiedRaw = document.lastModified;
    const lastModifiedDate = new Date(lastModifiedRaw);
    const lastModifiedText = isNaN(lastModifiedDate) ? lastModifiedRaw : lastModifiedDate.toLocaleString();

    const copyrightEl = document.getElementById('copyright');
    const lastModEl = document.getElementById('last-modified');
    if (copyrightEl) copyrightEl.textContent = `© ${year} Paraguay Travel Guide`;
    if (lastModEl) lastModEl.textContent = `Last modified: ${lastModifiedText}`;

    const temperatureC = 8; // °C
    const windKmh = 20; // km/h

    /**
     * @param {number} t
     * @param {number} v
     * @returns {number}
     */
    function calculateWindChill(t, v) {
        return 13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);
    }

    const windChillValueEl = document.getElementById('wind-chill-value');
    
    if (windChillValueEl) {
        if (temperatureC <= 10 && windKmh > 4.8) {
            const windChill = calculateWindChill(temperatureC, windKmh);
            const rounded = Math.round(windChill * 10) / 10;
            windChillValueEl.textContent = `${rounded} °C`;
        } else {
            windChillValueEl.textContent = 'N/A';
        }
    }
});
