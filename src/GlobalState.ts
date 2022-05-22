import {createGlobalState} from 'react-hooks-global-state';

const initialState = {
    logged_user: null,
    is_logged_in : false
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;