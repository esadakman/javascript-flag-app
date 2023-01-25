//*=========================================================
//*                     FLAG-APP
//*=========================================================

const fetchCountry = async (nameCountry) => {
  const url = `https://restcountries.com/v3.1/name/${nameCountry}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    renderError(err);
  }
};

const getAllCountryName = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    const names = data.map((country) => country.name.common);
    names.sort();
    names.forEach((country) => renderSelect(country));
  } catch (err) {
    renderError(err);
  }
};
const renderSelect = (country) => {
  const optionNew = document.createElement("option");
  optionNew.value = country;
  optionNew.textContent = country;
  document.querySelector("select").append(optionNew);
};

const renderError = (err) => {
  const countriesDiv = document.querySelector(".country_cards");
  countriesDiv.innerHTML = `
  <div class="error" >
    <img src="./assets/images/morphius.jpg" class="card-img-top" alt="Error Image">
    <h3 class="text-danger my-2">${err}</h3> 
  </div>
  `;
};

const renderCountry = (data) => {
  //!destructing
  const {
    capital,
    name: { common },
    region,
    flags: { svg },
    languages,
    currencies,
  } = data;

  // ! ________________
  const country = document.createElement("div");
  country.classList.add("d-flex", "justify-content-center", "mt-4");

  country.innerHTML += ` 
      <div class="section d-flex justify-content-center "> 
      <div class="card shadow-lg my-1" style="width: 18rem;">
          <img src="${svg}" class="card-img-top" alt="Country Flag" title="Flag">
          <div class="card-body" title="Country Name">
              <h5 class="card-title"> 
                ${common}
              </h5>
          </div>
          <ul class="list-group list-group-flush"> 
              <li class="list-group-item" title="Region">
                  <i class="fa-solid fa-earth-africa"></i> 
                  ${region}
              </li>
              
              <li class="list-group-item" title="Capital City"> 
                  <i class="fas fa-lg fa-landmark"></i> 
                  ${capital}
              </li>

              <li class="list-group-item" title="Languages"> 
              <i class="fas fa-lg fa-comments"></i> 
                  ${Object.values(languages)}
              </li>

              <li class="list-group-item" title="Currencies">
                  <i class="fas fa-lg fa-money-bill-wave"></i> 
                  ${Object.values(currencies)[0].symbol} 
                  ${Object.values(currencies)[0].name} 
              </li>
          </ul>
      </div>
    </div> 
    `;
  document.querySelector(".country_cards").innerHTML = "";
  document.querySelector(".country_cards").append(country);
};

const dropSelect = document.querySelector("select");
dropSelect.onchange = (e) =>
  fetchCountry(dropSelect.options[dropSelect.selectedIndex].text);
