import React, { Component } from 'react';
import {
    Grid,
    Step,
    Icon,
    Menu,
    Sidebar,
    Container,
    Modal,
    Card,
    Header,
    Button,
    Item,
    TableFooter,
    Image
} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import Election from '../../blockchain/election';
import Cookies from 'js-cookie';
import web3 from '../../blockchain/web3';
import { Link, Router } from '../../routes';
import { Helmet } from 'react-helmet';

var b = 0;
let cand = [];
let graphEmail = [];
let graphVotes = [];

const options = {
    maintainAspectRatio: true,
    responsive: true,
    scales: {
        yAxes: [
            {
                height: '500px',
                stacked: true,
                gridLines: {
                    display: true,
                    color: 'rgba(255,99,132,0.2)',
                },
            },
        ],
        xAxes: [
            {
                width: '500px',
                gridLines: {
                    display: false,
                },
            },
        ],
    },
};

const data = {
    labels: graphEmail,
    datasets: [
        {
            label: 'Vote Counts',
            backgroundColor: 'rgba(145,252,83,0.2)',
            borderColor: 'rgb(67,199,59)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: graphVotes,
        },
    ],
};

class ContainerExampleContainer extends Component {

    state = {
        election_address: Cookies.get('address'),
        election_name: '',
        election_desc: '',
        voters: 0,
        candidates: 0,
        visible: false,
        loading: false,
        b: 0,
        // timeRemaining: ''
    };
    async componentDidMount() {
        var http = new XMLHttpRequest();
        var url = '/student/';
        var params = 'election_address=' + Cookies.get('address');
        http.open('POST', url, true);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = function () {
            //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                var responseObj = JSON.parse(http.responseText);
                if (responseObj.status == 'success') {
                    b = responseObj.count;
                }
            }
        };
        http.send(params);
        try {
            const add = Cookies.get('address');
            const election = Election(add);
            const summary = await election.methods.getElectionDetails().call();
            const v = await election.methods.getNumOfVoters().call();
            this.setState({ voters: v });
            const c = await election.methods.getNumOfCandidates().call();
            this.setState({ candidates: c });
            this.setState({
                election_name: summary[0],
                election_desc: summary[1],
            });

            for (let i = 0; i < c; i++) {
                const tp = await election.methods.getCandidate(i).call();
                graphEmail.push(tp[0]);
                graphVotes.push(tp[3]);
            }
            this.returnGraph();
        } catch (err) {
            alert('Redirecting you to login page...');
            Router.pushRoute('/admin_login');
        }
        this.setState({ b: b });
    }

    getElectionDetails = () => {
        const { election_name, election_desc } = this.state;

        return (
            <div style={{ marginLeft: '43%', marginBottom: '2%', marginTop: '2%', float: 'left' }}>
                <Header as="h2">
                    <Icon name="address card" />
                    <Header.Content>
                        {election_name}
                        <Header.Subheader>{election_desc}</Header.Subheader>
                    </Header.Content>
                </Header>
            </div>
        );
    };

   
    CardExampleGroupProps = () => <Card.Group></Card.Group>;
    GridExampleGrid = () => <Grid>{columns}</Grid>;
    SidebarExampleVisible = () => (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                vertical
                visible
                width="thin"
                style={{ backgroundColor: 'white', borderWidth: '10px' }}
            >
                <Menu.Item as="a" style={{ color: '#704e06' }}>
                    <div style={{display:'flex' , justifyContent: 'center'}}>
                        <Image id="logo-image" src={`/tuk-logo.png`} style={{maxWidth: '100%',maxHeight:'50px'}}/>
                    </div>
                    <hr />
                </Menu.Item>
                <Link route={`/election/${Cookies.get('address')}/admin_dashboard`}>
                    <a>
                        <Menu.Item style={{ color: '#d0a242', fontColor: 'grey' }}>
                            <Icon name="dashboard" />
                            Dashboard
                        </Menu.Item>
                    </a>
                </Link>
                <Link route={`/election/${Cookies.get('address')}/candidate_list`}>
                    <a>
                        <Menu.Item as="a" style={{ color: '#d0a242' }}>
                            <Icon name="user outline" />
                            Candidate List
                        </Menu.Item>
                    </a>
                </Link>
                <Link route={`/election/${Cookies.get('address')}/voting_list`}>
                    <a>
                        <Menu.Item as="a" style={{ color: '#d0a242' }}>
                            <Icon name="list" />
                            Student Voter List
                        </Menu.Item>
                    </a>
                </Link>
                <hr />
                <Button onClick={this.signOut} style={{ backgroundColor: 'white' }}>
                    <Menu.Item as="a" style={{ color: '#704e06' }}>
                        <Icon name="sign out" />
                        Sign Out
                    </Menu.Item>
                </Button>
            </Sidebar>
        </Sidebar.Pushable>
    );
    signOut() {
        Cookies.remove('address');
        Cookies.remove('admin_email');
        Cookies.remove('admin_id');
        alert('Logging out.');
        window.location.href='/homepage';
    }

    // currentDate = new Date ()
    // electionDays = Cookies.get('days')
    // countDownDate = this.electionDays ? new Date(this.currentDate.getTime() + this.electionDays * 24 * 60 * 60 * 1000) :  new Date(this.currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    // updateCountdown = (that) => {

    //     let newThis = that;
    //     const daysTime = newThis.countDownDate;
    //     const now = new Date().getTime();

    //     const timeRemaining = daysTime - now;

    //     const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    //     const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    //     newThis.setState({timeRemaining: `${days} D, ${hours} h, ${minutes} m, ${seconds} s` })

    //     if (timeRemaining < 0) {
    //         newThis.setState({timeRemaining: `CLOSED` })
    //         clearInterval(newThis.updateCountdown);
    //         newThis.endElection();
    //     }
    // }


    endElection = async event => {
        let candidate = 0;
        try {
            this.setState({ loading: true });
            const add = Cookies.get('address');
            const election = Election(add);
            console.log("Test 0",election)
            const accounts = await web3.eth.getAccounts();
            console.log("Test 1",accounts)
            candidate = await election.methods.winnerCandidate().call({
                from: accounts[0]});

            cand = await election.methods.getCandidate(candidate).call();
            console.log("test 2",cand)
            var http = new XMLHttpRequest();
            var url = '/student/resultMail';
            var params =
                'election_address=' +
                Cookies.get('address') +
                '&election_name=' +
                this.state.election_name +
                '&candidate_email=' +
                cand[4] +
                '&winner_candidate=' +
                cand[0];
            http.open('POST', url, true);
            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            let that = this;
            http.onreadystatechange = function () {
                //Call a function when the state changes.
                if (http.readyState == 4 && http.status == 200) {
                    var responseObj = JSON.parse(http.responseText);
                    if (responseObj.status == 'success') {
                        alert('Mail sent!');
                        that.setState({loading: false})
                    } else {
                        alert(responseObj.message);
                        that.setState({loading: false})
                    }
                }
            };
            this.setState({ loading: true });
            http.send(params);
            window.location.href='/homepage';
        } catch (err) {
            console.log(err.message);
        }
    };

    returnModal = () => <h1>I won the election</h1>;

    returnGraph = () => <Bar data={data} width={120} height={50} options={options} />;

    render() {
        // setInterval(this.updateCountdown, 1000, this)
        return (
            <div>
                <Helmet>
                    <title>Dashboard</title>
                    <link rel="shortcut icon" type="image/x-icon" href="/tuk-logo.png" />
                </Helmet>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>{this.SidebarExampleVisible()}</Grid.Column>

                        <Layout>
                            <Grid.Column width={16}>
                                {this.getElectionDetails()}
                                <Button
                                    negative
                                    style={{ float: 'right', marginTop: '2%' }}
                                    onClick={this.endElection}
                                    loading={this.state.loading}
                                >
                                    End election
                                </Button>
                                {/* <Button
                                    style={{ marginRight:'5px', float:'right', marginTop: '2%' }}
                                >
                                    Remaining days : {this.state.timeRemaining}
                                </Button> */}
                                <Step.Group style={{ minWidth: 1130, minHeight: 90 }}>
                                    <Step icon="users" title="Students" description={this.state.b} />
                                    <Step icon="user outline" title="Candidates" description={this.state.candidates} />
                                    <Step
                                        icon="chart bar outline"
                                        title="Total Votes"
                                        description={this.state.students}
                                    />
                                </Step.Group>
                                {this.CardExampleGroupProps()}

                                <Grid.Column>
                                    <br />
                                    <div className="he">
                                        <style jsx>{`
											.he {
												height: 50%;
												max-width: 100%;
											}
										`}</style>
                                        {this.returnGraph()}
                                    </div>
                                </Grid.Column>
                                
                            </Grid.Column>
                        </Layout>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default ContainerExampleContainer;
