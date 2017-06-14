import {db} from "baqend/realtime";

class MovieService {

    /**
     * Loads movie suggestions for the typeahead input
     * @param {string} [title] The movie title
     */
    loadMovieSuggestions(title) {
        //TODO this method is unused, why tf should we implement this?
        console.log("whaabbababaka " + title);
        let query = db.Movie.find()
            .where({'id': {'$exists': true}})
            .matches('title', new RegExp("^" + title, "i")) //first try, but cant test
            .sort({'id': -1})
            .limit(10);

        return query.resultList((results) => results.map((result) => result.title));
    }

    /**
     * Loads a specific movie by title
     * @param {string} [title] The movie title
     */
    loadMovieByTitle(title) {
        //works
        let query = db.Movie.find()
            .where({'id': {'$exists': true}})
            .matches('title', "^" + title) //baqend does not support case-insensitive selection
            .sort({'id': -1});

        return query.singleResult();
    }

    /**
     * Queries movies filtered by the query arguments
     * @param {Object} [args] The query arguments
     * @param {string} [args.type=prefix|rating-greater|genre|genrePartialmatch|release|comments] The query type
     * @param {string} [args.parameter] The query parameter
     * @param {string} [args.limit=10] Max results
     */
    queryMovies(args) {
        let query = db.Movie.find()
            .where({'id': {'$exists': true}})
            .sort({'id': -1})
            .limit(Number(args.limit));

        switch (args.type) {
            case 'prefix':
                query.matches('title', new RegExp("^" + args.parameter));
                break;
            case 'rating-greater':

                break;
            case 'genre':

                break;
            case 'genrePartialmatch':
                break;
            case 'release':
                break;
            case 'comments':
                break;
        }

        return query.resultList();
    }

}

export default new MovieService()
