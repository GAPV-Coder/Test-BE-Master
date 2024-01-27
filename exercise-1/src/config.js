import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT,
    gitHubToken: process.env.GITHUB_TOKEN
};

export default config;