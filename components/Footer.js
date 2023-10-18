
import React from 'react';
import {Image} from "semantic-ui-react";

export default props => {
    return (
        <div className="Footer" style={{width: '100%', position: 'absolute' , marginTop: '15px',bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <div className='text-center ' style={{ padding: '10px', display: 'flex', alignItems: "center", justifyContent: "center" }}>
                <Image id='image' src={`/tuk-logo.png`} style={{maxWidth: '100%',maxHeight:'30px', paddingRight: '10px'}}/>
                &copy; {new Date().getFullYear()}{' '}
                <a className='text-dark' style={{paddingLeft : "10px"}} href='https://tukenya.ac.ke/'>
                    Click to access the main TUK website
                </a>
            </div>
            {props.children}
        </div>
    );
};
