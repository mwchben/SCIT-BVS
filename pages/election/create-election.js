import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Icon, Message } from 'semantic-ui-react';
import web3 from '../../blockchain/web3';
import Election_Factory from '../../blockchain/election_factory';
import { Router } from '../../routes';
import Cookies from 'js-cookie';
class LoginForm extends Component {
    state = {
        //retrieve the admin's email via cookie
        election_name: '',
        election_description: '',
        loading: false,
        errorMess: '',
        days: ''
    };

    signin = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMess: '' });
        try {
            Cookies.set("days", this.state.days ? this.state.days : 5)
            const email = Cookies.get('admin_email');
            const accounts = await web3.eth.getAccounts();
            const bool = await Election_Factory.methods
                .createElection(email, this.state.election_name, this.state.election_description)
                .send({ from: accounts[0] });
                console.log("bool",bool, accounts)
            if (bool) {
                const summary = await Election_Factory.methods.getDeployedElection(email).call();
                console.log(summary);
                this.setState({ loading: false });
                Cookies.set('address', summary[0]);
                Router.pushRoute(`/election/${summary[0]}/admin_dashboard`);
            }
        } catch (err) {
            this.setState({ errorMess: err.message });
        }
    };

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
                <Grid.Column style={{ maxWidth: 380 }}>
                    <Form size="large">
                        <Segment>
                            <Header as="h2" color="black" textAlign="center" style={{ marginTop: 10 }}>
                                Create an election!
                            </Header>
                            <Form.Input
                                fluid
                                iconPosition="left"
                                icon="address card outline"
                                placeholder="Election Name"
                                style={{ padding: 5 }}
                                value={this.state.election_name}
                                onChange={event => this.setState({ election_name: event.target.value })}
                                required={true}
                            />
                            <Form.Input
                                as="TextArea"
                                required={true}
                                style={{
                                    maxHeight: '30px',
                                    maxWidth: '96%',
                                    marginBottom: '10px',
                                }}
                                fluid
                                placeholder="Election Description"
                                value={this.state.election_description}
                                onChange={event => this.setState({ election_description: event.target.value })}
                            />

                            <Form.Input
                                fluid
                                iconPosition="left"
                                icon="keyboard card outline"
                                placeholder="Election days"
                                type="number"
                                style={{ padding: 5 }}
                                value={this.state.days}
                                onChange={event => this.setState({ days: event.target.value })}
                                required={true}
                            />

                            <Button
                                color="blue"
                                fluid
                                size="large"
                                style={{ marginBottom: 15 }}
                                onClick={this.signin}
                                loading={this.state.loading}
                            >
                                Submit
                            </Button>
                            <Message icon info>
                                <Icon name="exclamation circle" />
                                <Message.Header>Note: </Message.Header>
                                <Message.Content>Election creation will take several minutes.</Message.Content>
                            </Message>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    );

    render() {
        return (
            <div>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                {/* <link href="../css/paper-dashboard.css?v=2.0.0" rel="stylesheet" /> */}
                {this.LoginForm()}
            </div>
        );
    }
}

export default LoginForm;
