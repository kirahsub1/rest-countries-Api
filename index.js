const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");

async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Network response was not ok");
    const countries = await response.json();
    displayCountries(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    countriesContainer.innerHTML = `<p>Error fetching countries data. Please try again later.</p>`;
  }
}

function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");

    countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${
      country.name.common
    } flag" class="country-img"/>
            <h2>${country.name.common}</h2>
            <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
        `;

    countriesContainer.appendChild(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const countryCards = document.querySelectorAll(".country-card");

  countryCards.forEach((card) => {
    const countryName = card.querySelector("h2").textContent.toLowerCase();
    if (countryName.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

fetchCountries();
