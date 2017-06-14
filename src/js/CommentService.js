import {db} from "baqend/realtime";

class CommentService {

    /**
     * Returns a comment stream for a movie
     * @param {Object} [movie] The reference to the movie object
     */
    streamComments(movie) {
        //TODO
        let query = db.MovieComment.find()
            .where({'id': {'$exists': true}})
            .sort({'id': -1});

        return query.resultStream()
    }

    /**
     * Queries comments filtered by the query arguments
     * @param {Object} [args] The query arguments
     * @param {string} [args.type=prefix|keyword] The query type
     * @param {string} [args.parameter] The query parameter
     * @param {string} [args.limit=10] Max results
     */
    queryComments(args) {
        let query = db.MovieComment.find()
            .where({'id': {'$exists': true}})
            .sort({'id': -1})
            .limit(new Number(args.limit));

        switch (args.type) {
            //TODO
        }

        return query.resultList({depth: 1}); // with depth: 1, the referenced movies will be loaded
    }

    /**
     * Adds a comment for a movie
     * @param {Object} [movie] The reference to the movie object
     * @param {Object} [comment] The comment
     * @param {string} [comment.username] The comment username
     * @param {string} [comment.text] The comment text
     */
    addComment(movie, comment) {
        //TODO
        alert("Comment adding not implemented, yet!");
    }

    /**
     * Returns a comment stream for a movie
     * @param {Object} [comment] The reference to the old comment object
     * @param {String} [newText] The new text
     */
    editComment(comment, newText) {
        //TODO
        alert("Comment editing not implemented, yet!");
    }

}

export default new CommentService()
