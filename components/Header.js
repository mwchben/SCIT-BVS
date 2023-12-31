
import React from 'react';
import { Menu } from 'semantic-ui-react';
import Cookies from 'js-cookie';

export default props => {
    return (
        <div className="header">
            <style jsx>{`
				.header {
					z-index: 10;
				}
			`}</style>
            <Menu secondary style={{ maxHeight: '50px' }}>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                <Menu.Item
                    name="SCIT Voting Application"
                    style={{ verticalAlign: 'middle',color: '#005454', fontSize: '40px', paddingLeft: '4%', paddingTop: '4%' }}
                />
                <Menu.Menu position="right">
                    <Menu.Item icon="user" />
                    <Menu.Item style={{ paddingRight: '10px' }}>
                        {Cookies.get('admin_email') || Cookies.get('student_email')}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <hr />
            {props.children}
        </div>
    );
};
