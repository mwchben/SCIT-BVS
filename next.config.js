const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
module.exports = withCSS()

const nextConfig =  {
    env: {
        EMAIL: process.env.EMAIL,
        PASSWORD: process.env.PASSWORD,
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
        CONTRACT2_ADDRESS: process.env.CONTRACT2_ADDRESS,
        CONTRACT3_ADDRESS: process.env.CONTRACT3_ADDRESS
    }
}

module.exports = withPlugins(
    [[withCSS()]],
    nextConfig
);
