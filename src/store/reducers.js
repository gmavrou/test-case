import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILED } from './constants';

const initialState = {
    names: [],
    geoData: [],
    isPending: false
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case REQUEST_PENDING:
            return Object.assign({}, state, { isPending: true });

        case REQUEST_SUCCESS: 
            return Object.assign({},
                state, {
                geoData: action.data.geonames,
                isPending: false
            });

        case REQUEST_FAILED:
            return Object.assign({}, state, { isPending:false })

        default: 
            return state;
    }
}

export default reducer;