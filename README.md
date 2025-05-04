# blockchain-election-voting
A web3  election voting application that taps the power of blockchain technology to facilitate elections  in the school of SCIT institution

## Prerequisite
**i. One**
- Make sure you have node installed: prefferably *L.T.S v16.20.2*
- If on another -v: use [NVM](https://github.com/nvm-sh/ntab=readme-ov-file#set-default-node-version) by installing with `curl -o- https://rgithubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`

1. `nvm install 12.14.1`
2. `nvm alias default 12.14.1`
3. `nvm use 12.14.1`
4. `node -v #to check if you are on v16`

**ii. Two**
- You have a mongo instance running
- If not, head over to [mongo-atlas](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/) and create an account.
- Head over to *database\connect.js* and update the mongodb string accordingly
    
## Installation

### 1. Clone
Run `git clone https://github.com/mwchben/SCIT-BVS.git`

### 2. Change Dir
Cd to SCIT-BVS as `cd SCIT_BVS`
Run **ls** and confirm dir Structure as below:

![Dir Structure](/Markdown/ls.png)

### 3. Package installations
Run `npm i`

### 4. Fire Server
Run `npm run start`
The server run as follows:

```
> SCIT Blockchain Voting System@1.0.0 start
> node server.js
```

### 5. GO to localhost on port 3000
A message will appear on the terminal, click the link to access the webpage:
```
    Server listening on port 3000, access with "http://localhost:3000/"  please
    Connected to Mongo Database
```
## Dashboard overview / Activities (Images)

Sample Pictures:-

![Dashboard](/Markdown/dashboard)

![admin](/Markdown/admin_creation)  ![election](/Markdown/election_creation)


