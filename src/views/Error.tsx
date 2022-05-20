import React from 'react';
import {useNavigate} from 'react-router-dom';


export default () => {
    let history = useNavigate();
    return (
        <div className='error_container'>
            <div className='error_center'>
                <h4 className="display-4">Ops!</h4>
                <span>Page Not Found</span>
            </div>
        </div>
    );
}