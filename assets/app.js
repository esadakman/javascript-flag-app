//*=========================================================
//*                     FLAG-APP
//*=========================================================

const fetchCountry = async (nameCountry) => {
  // const drop = document.querySelector("#dropDown");
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
getAllCountryName();

const renderSelect = (country) => {
  const optionNew = document.createElement("option");
  optionNew.value = country;
  optionNew.textContent = country;
  document.querySelector("select").append(optionNew);
};

const renderError = (err) => {
  const countriesDiv = document.querySelector(".country_cards");
  // alert("asdfsaf");
  countriesDiv.innerHTML = `
  <div class="error" >
       <h1 class="text-danger">${err}</h1>
        <img src="./assets/morphius.jpg" alt="" />
        </div>
       `;
};

const renderCountry = (data) => {
  //!destructing
  const countriesDiv = document.querySelector(".country_cards");

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
    
    <div class="section d-flex justify-content-center"> 
    <div class="card shadow-lg my-1" style="width: 18rem;">
        <img src="${svg}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"> ${common}</h5>
          </div>
          <ul class="list-group list-group-flush">
          
          <li class="list-group-item"><i class="fa-solid fa-earth-africa"></i> ${region}</li>
         
          <li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i> ${capital}</li>
          <li class="list-group-item"> <i class="fas fa-lg fa-comments"></i> ${Object.values(
            languages
          )} </li>
          <li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i> ${
            Object.values(currencies)[0].symbol
          } ${Object.values(currencies)[0].name} </li>
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
