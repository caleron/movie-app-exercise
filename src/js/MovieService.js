import {db} from "baqend/realtime";

class MovieService {

    /**
     * Loads movie suggestions for the typeahead input
     * @param {string} [title] The movie title
     */
    loadMovieSuggestions(title) {
        //TODO
        let query = db.Movie.find()
            .where({'id': {'$exists': true}})
            .sort({'id': -1})
            .limit(10);

        return query.resultList((results) => results.map((result) => result.title));
    }

    /**
     * Loads a specific movie by title
     * @param {string} [title] The movie title
     */
    loadMovieByTitle(title) {
        //TODO
        let query = db.Movie.find()
            .where({'id': {'$exists': true}})
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
            .limit(new Number(args.limit));

        switch (args.type) {
            //TODO
        }

        return query.resultList();
    }

}

export default new MovieService()
