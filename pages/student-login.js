import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import { Router } from '../routes';
import { Helmet } from 'react-helmet';



class LoginForm extends Component {
    state = {
        election_address: '',
        validEmail : true,
    };

    // emailError addedcomponent
    ErrorComponent = () => (

        <div>
            <Message
                header="Invalid Email"
                content="Error! Student emails should be in the format 'name@students.tukenya.ac.ke'"/>
        </div>
    );

    LoginForm = () => (
        <div className="login-form">
            <style jsx>{`
                .login-form {
                    width:100%;
                    height:100%;
                    position:absolute;
                    background: url('/blockchain.jpg') no-repeat;
                } 
              `}</style>

            <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Form size="large">
                        <Segment>
                            <Header as="h2" color="black" textAlign="center" style={{ marginTop: 10 }}>
                                Login
                            </Header>

                            {/* {!this.state.validEmail ? this.ErrorComponent() : ''}  */}
                            <Form.Input
                                fluid 
                                icon="user"
                                iconPosition="left"
                                placeholder="Email"
                                style={{ padding: 5 }}
                                id="signin_email"
                                error={!this.state.validEmail}
                            />
                            <Form.Input
                                style={{ padding: 5 }}
                                fluid
                                id="signin_password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                            />

                            <Button color="blue" fluid size="large" style={{ marginBottom: 15 }} onClick={this.signin}>
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    );
    signin = event => {
        const email = document.getElementById('signin_email').value;
        
        // email validator
        // const emailChecker = /^[\w.-]+@students\.tukenya\.ac\.ke$/
        // this.setState({validEmail : emailChecker.test(email)});
        // if(!emailChecker.test(email)){
        //     alert("Error! Student emails should be in the format 'name@students.tukenya.ac.ke'");
        //     return;
        // }

        const password = document.getElementById('signin_password').value;
        var http = new XMLHttpRequest();
        var url = 'student/authenticate';
        var params = 'email=' + email + '&password=' + password;
        http.open('POST', url, true);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = function () {
            //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                var responseObj = JSON.parse(http.responseText);
                if (responseObj.status == 'success') {
                    Cookies.set('student_email', encodeURI(email));
                    Cookies.set('address', encodeURI(responseObj.data.election_address));
                    Router.pushRoute(`/election/${responseObj.data.election_address}/vote`);
                } else {
                    alert(responseObj.message);
                }
            }
        };
        http.send(params);
    };

    render() {
        return (
            <div>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                <Helmet>
                    <title>Student voter login</title>
                    <link rel="shortcut icon" type="image/x-icon" href="/tuk-logo.png" />
                </Helmet>
                {this.LoginForm()}
            </div>
        );
    }
}

export default LoginForm;
