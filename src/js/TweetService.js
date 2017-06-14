import {db} from "baqend/realtime";

class TweetService {

    /**
     * Returns a comment stream for a movie
     * @param {Object} [movie] The reference to the movie object
     */
    streamMovieTweets(movie) {
        //TODO
        let query = db.Tweet.find()
            .where({'id': {'$exists': true}})
            .sort({'id': -1})
            .limit(10);
        return query.resultStream()
    }

    /**
     * Returns a comment stream for a movie
     * @param {Object} [args] The query arguments
     * @param {string} [args.type=prefix|keyword|followersOrFriends] The query type
     * @param {string} [args.parameter] The query parameter
     * @param {string} [args.limit=10] Max results
     */
    queryTweets(args) {
        let query = db.Tweet.find()
            .where({'id': {'$exists': true}})
            .sort({'id': -1})
            .limit(new Number(args.limit));

        switch (args.type) {
            //TODO
        }

        return query.resultStream()
    }

}

export default new TweetService()
