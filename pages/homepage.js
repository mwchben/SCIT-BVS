import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '../routes';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
} from 'semantic-ui-react';
import '../public/hometest.css';
import { Helmet } from 'react-helmet';
const HomepageHeading = ({ mobile }) => (
    <Container text className="cont">
        <Header
            as="h2"
            content="A Web3 blockchain E-voting system for the School Of SCIT."
            inverted
            style={{
                fontSize: mobile ? '2em' : '3em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '2em',
                color: '#F4D492',
            }}
        />
        <Header
            as="h4"
            content="Make your vote count!"
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
                color: '#F8EED8',
            }}
        />
        <div style={{ float: 'left', marginTop: '10%', backgroundColor: '#0B8A8A', padding: '15px' }}>
            <Header as="h4" style={{ color: '#f4d492' }}>
                School Admin Register / Sign in
            </Header>
            <Link route="/admin-login">
                <Button primary size="huge" style={{ color: 'green', backgroundColor: 'white', margin:'10px' }}>
                    <Icon name="left arrow" />
                    School admin
                </Button>
            </Link>
        </div>

        <div style={{ float: 'right', marginTop: '10%', backgroundColor: '#a03334', padding: '20px' }}>
            <Header as="h4" style={{ color: 'yellow' }}>
                Student Login
            </Header>
            <Link route="/student-login">
                <Button primary size="huge" style={{ color: 'blue', backgroundColor: 'white', margin:'10px' }}>
                    Student
                    <Icon name="right arrow" />
                </Button>
            </Link>
        </div>
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
};

class DesktopContainer extends Component {
    state = {};

    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });

    render() {
        const { children } = this.props;
        const { fixed } = this.state;

        return (
            <Responsive>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                <Helmet>
                    <title>HomePage</title>
                    <link rel="shortcut icon" type="image/x-icon" href="/kabu-logo.png" />
                </Helmet>
                <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
                    <Segment inverted textAlign="center" style={{ minHeight: 700, padding: '0em 0em'}} vertical>
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size="large"
                            className="menu" style={{ backgroundColor: '#0b8a8a' }}>
                            <Container>
                                <h1
                                    style={{
                                        color: 'white',
                                        verticalAlign: 'middle',
                                        fontFamily: 'Freestyle Script',
                                        fontSize: '300%',
                                        paddingLeft: '35%',
                                    }}
                                >
                                    SCIT E-Voting Portal
                                </h1>
                            </Container>
                        </Menu>
                        <HomepageHeading />
                    </Segment>
                </Visibility>
                {children}
            </Responsive>
        );
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
};

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
};

const HomepageLayout = () => (
    <ResponsiveContainer>
        <Segment style={{ padding: '6em 0em', backgroundColor: '#fbfbfb' }} vertical>
            <Grid columns="equal" stackable>
                <Grid.Row textAlign="center">
                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as="h3" style={{ fontSize: '2em' }}>
                            Transparent
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Any student/admin can verify vote casted into the blockchain <br />
                            The school fraternity can trust the network
                        </p>

                        <Header as="h3" style={{ fontSize: '2em' }}>
                            Secure
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Irreversible audit trail <br /> Allowing easy tracing of changes on the system.
                        </p>
                    </Grid.Column>
                    <Image src="/kabu-logo.png" width="216" height="256" style={{ paddingTop: '50px'}} />

                    <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                        <Header as="h3" style={{ fontSize: '2em' }}>
                            Decentralized
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            No single authority <br /> can interrupt the operation of the system.
                        </p>
                        <Header as="h3" style={{ fontSize: '2em' }}>
                            Immutable
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Impossible to erase or replace recorded data.<br /> This prevents election data tampering.
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em', backgroundColor: '#0b8a8a' }}>
            <Container>
                <Header as="h3" style={{ fontSize: '2em', color: 'white', textAlign: 'center' }}>
                    About us
                </Header>
                <p style={{ fontSize: '1.33em', textAlign: 'center', fontStyle: 'Italic' }}>
                    "True to TU-K’s philosophy of developing holistic graduates with requisite knowledge, skills and attitudes for the real world of work, the school of computing has a tradition of focusing on skills 
                    development based on sound theoretical underpinnings and exhibited through demonstration of skills in the studied fields."
                </p>
                <Header as="h2" style={{ fontSize: '1.33em', color: 'white', textAlign: 'center' }}>
                    The Technical University of Kenya
                </Header>
            </Container>
        </Segment>
    </ResponsiveContainer>
);
export default HomepageLayout;
