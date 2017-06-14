import {db} from "baqend/realtime";

class TweetService {

    /**
     * Returns a comment stream for a movie
     * @param {Object} [movie] The reference to the movie object
     */
    streamMovieTweets(movie) {
        //idk where this is needed, maybe in movie detail view, where it does not work
        let query = db.Tweet.find()
            .where({
                       'id': {'$exists': true}
                   })
            .matches('text', new RegExp("^.*" + movie.title.replace(" ", ".*")))
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
        //this works smooth
        let query = db.Tweet.find()
            .where({'id': {'$exists': true}})
            .sort({'id': -1})
            .limit(Number(args.limit));

        console.log(args);
        switch (args.type) {
            case 'prefix':
                query = query.matches('text', new RegExp("^" + args.parameter));
                break;
            case 'keyword':
                query = query.matches('text', new RegExp("^.*" + args.parameter));
                break;
            case 'followersOrFriends':
                let nr = Number(args.parameter);
                query = query.where({
                                        $or: [{"user.followers_count": {$gt: nr}}, {"user.friends_count": {$gt: nr}}]
                                    });
                break
        }

        return query.resultStream()
    }

}

export default new TweetService()
