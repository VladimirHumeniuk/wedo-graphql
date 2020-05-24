import { tryCatchWithApolloErrorAsync } from '../../helpers/error-handler.helper';
import { CommentService } from './Comment.service';

export const CommentResolver = new class {
    private readonly commentService: CommentService = new CommentService();

    Query = {
      getCompanyComments: async (_: null, {cid}) => {
        return await tryCatchWithApolloErrorAsync(async() => {
          return this.commentService.getAllEntities(cid);
        });
      }
    };
  
    Mutation = {};
}();