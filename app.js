//*=========================================================
//*                     FLAG-APP
//*=========================================================

const fetchCountry = async (nameCountry) => {
  // const drop = document.querySelector("#dropDown");

  const url = `https://restcountries.com/v3.1/name/${nameCountry}`;
  try {
    const res = await fetch(url);
    // if (!res.ok) {
    //   renderError(`Something went wrong:${res.status}`);
    //   throw new Error();
    // }
    const data = await res.json();
    // let output = "";

    renderCountry(data[0]);
  } catch (err) {
    // console.log(error);
    renderError(err);
  }
};

const renderError = (err) => {
  const countriesDiv = document.querySelector(".countries");
  countriesDiv.innerHTML = `
       <h1 class="text-danger">${err}</h1>
       <img src="./morphius.jpg" alt="" />
      `;
};

const getAllCountryName = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    const names = data.map((country) => country.name.common);
    names.sort();
    names.forEach((country) => renderSelect(country));
    console.log(country);
  } catch (err) {
    renderError(err);
  }
};
getAllCountryName();

const renderSelect = (country) => {
  const newOption = document.createElement("option");
  newOption.value = country;
  newOption.textContent = country;
  document.querySelector("select").append(newOption);
};

const renderCountry = (data) => {
  console.log(data);
  const countriesDiv = document.querySelector(".countries");

  //!destructing

  const {
    capital,
    name: { common },
    region,
    flags: { svg },
    languages,
    currencies,
  } = data;

  // console.log(capital, common, region, svg);
  // console.log(Object.values(languages));
  // console.log(Object.values(currencies)[0].name);
  // console.log(Object.values(currencies)[0].symbol);

  countriesDiv.innerHTML += `
  
    <div class="card shadow-lg" style="width: 18rem;">
      <img src="${svg}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${common}</h5>
        <p class="card-text">${region}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i> ${capital}</li>
        <li class="list-group-item"> <i class="fas fa-lg fa-comments"></i> ${Object.values(
          languages
        )}</li>
  
        <li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i> ${
          Object.values(currencies)[0].name
        }, ${Object.values(currencies)[0].symbol} </li>
  
      </ul>
    </div>
  
    `;
};

const dropdown = document.querySelector("select");
dropdown.onchange = (e) =>
  fetchCountry(dropdown.options[dropdown.selectedIndex].text);

// fetchCountry("turkey");
// fetchCountry("usa");
// fetchCountry("belgium");
// fetchCountry("south africa");

// data.forEach((country) => {
// output += `<option value="${country.name.common}">${country.name.common}</option>`;
// console.log(country.name.common);
// });
// drop.innerHTML = output;
