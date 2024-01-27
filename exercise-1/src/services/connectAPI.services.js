import { getMostPopularRepos } from '../helpers/connectAPI.js';

const getMostPopularReposService = async (username, limit) => {
    try {
        const repos = await getMostPopularRepos(username, limit);
        return repos;
    } catch (error) {
        throw Error(
            `Error in getting most popular repositories: ${error.message}`,
            error,
        );
    }
};

export { getMostPopularReposService };
