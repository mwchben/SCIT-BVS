const routes = require('next-routes')()

routes
    .add('/', '/homepage')
    .add('/homepage','/homepage')
    .add('/admin_login','/admin-login')
    .add('/student_login','/student-login')
    .add('/election/:address/admin_dashboard','/election/admin-dashboard')
    .add('/election/:address/voting_list','/election/voting-list')
    .add('/election/:address/addcand','/election/addcand')
    .add('/election/:address/vote','/election/vote')
    .add('/election/:address/candidate_list','/election/candidate-list');
module.exports = routes;
