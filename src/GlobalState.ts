import {createGlobalState} from 'react-hooks-global-state';
import Users from "./Models/Users";

const logged_user: Users | any = null;
const initialState = {
    logged_user: logged_user,
    is_logged_in: false
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;