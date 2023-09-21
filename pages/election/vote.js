import React, { Component } from 'react';
import { Grid, Button, Header, Icon, Image, Menu, Sidebar, Container, Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../blockchain/web3';
import Election from '../../blockchain/election';
import Cookies from 'js-cookie';
import {Router} from '../../routes';
import {Helmet} from 'react-helmet';

class StudentList extends Component {

    state = {
        numCand: '',
        election_address: Cookies.get('address'),
        election_name: '',
        election_description: '',
        candidates: [],
        cand_name: '',
        cand_desc: '',
        buffer: '',
        student_email: Cookies.get('student_email'),
        ipfsHash: null,
        loading: false
    };
    GridExampleGrid = () => <Grid>{columns}</Grid>
    SidebarExampleVisible = () => (

        <Sidebar.Pushable>
            <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin' style={{ backgroundColor: 'white', borderWidth: "10px" }}>
                <Menu.Item as='a' style={{ color: 'grey' }} >
                    <h2>MENU</h2><hr/>
                </Menu.Item>
                <Menu.Item as='a' style={{ color: 'grey' }} >
                    <Icon name='dashboard' />
                    Dashboard
                </Menu.Item>
                <hr/>
                <Button onClick={this.signOut} style={{backgroundColor: 'white'}}>
                    <Menu.Item as='a' style={{ color: 'grey' }}>
                        <Icon name='sign out' />
                        Sign Out
                    </Menu.Item>
                </Button>
            </Sidebar>
        </Sidebar.Pushable>
    )

    signOut() {
        Cookies.remove('address');
        Cookies.remove('student_email');
        alert("Logging out.");
        window.location.href='/homepage';
    }

    async componentDidMount() {
        try {
            const add = Cookies.get('address');
            console.log("add",add)
            const election = Election(add);
            const summary = await election.methods.getElectionDetails().call();
            this.setState({
                election_name: summary[0],
                election_description: summary[1]
            });

            const c = await election.methods.getNumOfCandidates().call();

            let candidates = [];
            for(let i=0 ; i<c; i++) {
                candidates.push(await election.methods.getCandidate(i).call());
            }
            let i=-1;
            const items = candidates.map(candidate => {
                i++;
                return {
                    header: candidate[0],
                    description: candidate[1],
                    image: (
                        <Image id={i} src={`https://ipfs.io/ipfs/${candidate[2]}`} style={{maxWidth: '100%',maxHeight:'190px'}}/>
                    ),
                    extra: (
                        <div>
                            <Icon name='pie graph' size='big' iconPostion='left'/>
                            {candidate[3].toString()}
                            <Button id={i} style={{float: 'right'}} onClick={this.vote} primary>Vote!</Button>
                        </div>
                    )
                };

            });
            this.setState({item: items});
        } catch(err) {
            // console.log("err", err)
            // console.log(err.message);
            alert("Session expired. Redirecting you to login page...");
            Router.pushRoute('/student_login');
        }
    }
    getElectionDetails = () => {
        const {
            election_name,
            election_description,
            student_email
        } = this.state;

        return (
            <div style={{marginLeft: '10%',marginBottom: '2%',marginTop: '2%'}}>
                <Header as="h2">
                    <Icon name="address card" />
                    <Header.Content>
                        {election_name}
                        <Header.Subheader>{election_description}</Header.Subheader><br/>
                        <Header.Subheader>The student(voter)is - {student_email}</Header.Subheader>
                    </Header.Content>
                </Header>
            </div>
        );
    }

    renderTable = () => {
        return (<Card.Group items={this.state.item}/>)
    }

    vote = async event => {
        const e = parseInt(event.currentTarget.id,10);
        const accounts = await web3.eth.getAccounts();
        const add = Cookies.get('address');
        // console.log("addres", add)
        const election = Election(add);
        await election.methods.vote(e,Cookies.get('student_email')).send({from: accounts[0]});
        alert("Voted!")
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Vote</title>
                    <link rel="shortcut icon" type="image/x-icon" href="/tuk-logo.png" />
                </Helmet>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            {this.SidebarExampleVisible()}
                        </Grid.Column>
                        <Layout>
                            {this.getElectionDetails()}
                            <Grid.Column style={{minHeight: '77vh',marginLeft: '10%'}}>
                                <Container>
                                    {this.renderTable()}
                                </Container>
                            </Grid.Column>
                        </Layout>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}


export default StudentList