function getPark(state, limit) {
  state = state.split(",");
  let stateUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${limit}&api_key=LRg7FeFjjKkaKqbFmTUvnCdBVPf9AxTvxDkmu6w0`;
  fetch(stateUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
      for (let i = 0; i < responseJson.data.length; i++) {
        $("#result-list").append(`<li><h3>${responseJson.data[i]}</h3></li>`);
      }
    });
}

function displayResults(responseJson) {
  // clear previous results if any
  $("#results-list").empty();

  //iterate through the items
  for (let i = 0; i < responseJson.data.length; i++) {
    $("#results-list").append(
      `<li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <p>
          ${responseJson.data[i].addresses[0].line1}, ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}
        </p>
        <a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a>
      </li>`
    );
  }
}

function watchForm(state, limit) {
  $("#js-form").submit((event) => {
    event.preventDefault();
    state = $("#js-search-state").val();
    limit = $("#js-max-results").val();
    getPark(state, limit);
  });
}

$(watchForm);
