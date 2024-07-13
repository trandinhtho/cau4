document.addEventListener('DOMContentLoaded', async () => {
	try {
			const response = await fetch('/weather');
			const data = await response.json();

			const weatherElement = document.querySelector('.weather');
			weatherElement.innerHTML = `
					<div class="temperature">${data.temperature} &deg;C</div>
					<div class="description">${data.description}</div>
			`;
	} catch (error) {
			console.error('Error fetching weather data:', error);
			const weatherElement = document.querySelector('.weather');
			weatherElement.innerHTML = '<p>Error fetching weather data</p>';
	}
});
