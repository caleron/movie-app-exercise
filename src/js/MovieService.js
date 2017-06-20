import {db} from "baqend/realtime";

class MovieService {

    /**
     * Loads movie suggestions for the typeahead input
     * @param {string} [title] The movie title
     */
    loadMovieSuggestions(title) {
        //TODO this method is unused, why tf should we implement this?
        //Simon could not find it out either
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

        //debug
        //db.Movie.find().singleResult((movie) => {console.log(movie.releases);});

        switch (args.type) {
            case 'prefix':
                query.matches('title', new RegExp("^" + args.parameter));
                break;
            case 'rating-greater':
                query.greaterThan('rating', parseFloat(args.parameter));
                break;
            case 'genre':
                query.containsAll('genre', args.parameter.split(','));
                break;
            case 'genrePartialmatch':
                query.matches('genre', new RegExp("^" + args.parameter));
                break;
            case 'release':
                //TODO
                let datum = new Date(50,1,1,0,0,0,0);
                query = query.where({
                                      "releases": {
                                          "$elemMatch": {
                                            "country": args.parameter,
                                            //this line breaks it. you can comment it out so that only country is matched
                                            "date": {"$lt": { "$date": datum.toISOString()}}
                                          }
                                    }});
                break;
          case 'comments':
                //works
                let movielist = [];
                return db.MovieComment.find()
                    .where({'id': {'$exists': true}})
                    .sort({'id': -1})
                    .matches('username', new RegExp("^" + args.parameter))
                    .resultList((result) => {
                        result.forEach((comment) => {
                            if (comment.movie != null) {
                                movielist.push(comment.movie);
                            }
                        });
                        //this line appearantly does not work.
                        query.in('id', movielist);
                        //the movie list is actually what has to be displayed.
                        //but this app wants a Promise instead of a list.
                        //query.resultList() returns such a Promise.
                    }).then(p1 => {
                        return query.resultList()
                    });
                break;
        }
        if (args.type !== 'comments') {
            return query.resultList();
        }
    }

}

export default new MovieService()
