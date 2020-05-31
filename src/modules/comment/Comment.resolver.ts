import { QueryPayloadInput } from './../../models/inputs/Query.payload';
import { tryCatchWithApolloErrorAsync } from '../../helpers/error-handler.helper';
import { CommentService } from './Comment.service';

export const CommentResolver = new class {
  private readonly commentService: CommentService = new CommentService();

  Query = {
    getCompanyComments: async (_: null, { cid, query = {} }) => {
      return await tryCatchWithApolloErrorAsync(async () => {
        return this.commentService.getAllEntities(cid, query);
      });
    }
  };

  Mutation = {
    addComment: async (_: null, { companyId, comment }) => {
      return await tryCatchWithApolloErrorAsync(async () => {
        return this.commentService.addComment(companyId, comment);
      });
    },

    setComment: async (_: null, { companyId, comment }) => {
      return await tryCatchWithApolloErrorAsync(async () => {
        return this.commentService.setComment(companyId, comment);
      });
    },

    removeComment: async (_: null, { companyId, commentId }) => {
      return await tryCatchWithApolloErrorAsync(async() => {
        return this.commentService.removeComment(companyId, commentId);
      });
    }
  };
}();