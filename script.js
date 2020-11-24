const searchURL = curl 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=LRg7FeFjjKkaKqbFmTUvnCdBVPf9AxTvxDkmu6w0';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }