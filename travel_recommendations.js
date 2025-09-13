let travelData = {};


async function loadTravelData() {
  try {
    const response = await fetch('./travel_data.json'); 
    travelData = await response.json();
    console.log('Travel data loaded:', travelData); 
  } catch (error) {
    console.error('Error loading travel data:', error);
  }
}

function searchKeyword(keyword) {
  keyword = keyword.toLowerCase(); 

  if (keyword.includes('beach')) {
    return travelData.beaches.slice(0, 2);
  } else if (keyword.includes('temple')) {
    return travelData.temples.slice(0, 2); 
  } else if (keyword.includes('country')) {
    return travelData.countries.slice(0, 2); 
  } else {
    return []; 
  }
}

//displays results on the page
function displayResults(results, keyword) {
  // Remove previous results
  const container = document.getElementById('results-container');
  container.innerHTML = '';

  if (results.length === 0) {
    container.innerHTML = `<p>No results found for "${keyword}"</p>`;
    return;
  }

  results.forEach(item => {
    const card = document.createElement('div');
    card.className = 'result-card';

    // Different structures for countries vs beaches/temples
    let contentHTML = '';
    if (item.cities) {
      // Country: include cities
      const citiesHTML = item.cities.map(city => `
        <div class="place">
          <h3>${city.name}</h3>
          <img src="${city.imageUrl}" alt="${city.name}" />
          <p>${city.description}</p>
        </div>
      `).join('');
      contentHTML = `<h2>${item.name}</h2>${citiesHTML}`;
    } else {
      // Beach or Temple
      contentHTML = `
        <h2>${item.name}</h2>
        <img src="${item.imageUrl}" alt="${item.name}" />
        <p>${item.description}</p>
      `;
    }

    card.innerHTML = contentHTML;
    container.appendChild(card);
  });
}

// 4. Event listener for Search button
document.getElementById('search_button').addEventListener('click', () => {
  const keyword = document.getElementById('search_bar').value.trim();
  const results = searchKeyword(keyword);
  displayResults(results, keyword);
});

// Optional: Reset button
document.getElementById('reset_button').addEventListener('click', () => {
  document.getElementById('search_bar').value = '';
  document.getElementById('results-container').innerHTML = '';
});

// 5. Initial load
loadTravelData();
