import {createGlobalState} from 'react-hooks-global-state'


const GlobalState = createGlobalState({
    logged_user: null,
    is_signed_in: false
});


export default GlobalState;