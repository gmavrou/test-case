import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED } from "./constants"

export function getFetchData() {
    return dispatch => {
        dispatch({ type: REQUEST_PENDING })
        fetch('http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane')
        .then(response => response.json())
        .then(data => dispatch({ type: REQUEST_SUCCESS, data }))
        .catch(error => dispatch({ type : REQUEST_FAILED, payload : error }))
    }
}