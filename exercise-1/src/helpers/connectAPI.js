import { request } from '@octokit/request';
import config from '../config.js';



const getMostPopularRepos = async (username, limit = 10) => {
        try {
            const response = await request('GET /users/{username}/repos', {
                headers: {
                    authorization: `token ${config.gitHubToken}`,
                },
                username,
                sort: 'stars',
                per_page: limit,
            });

            return response.data;
        } catch (error) {
            throw Error(
                `Error obtaining repositories for ${username}: ${error.message}`,
            );
        }
    }


export { getMostPopularRepos };
