import { tryCatchWithApolloErrorAsync } from '../../helpers/error-handler.helper';
import { VoteService } from './Vote.service';

export const VoteResolver = new class {
    private readonly voteService: VoteService = new VoteService();

    Query = {
    };
  
    Mutation = {
      setVote: async (_: null, {companyId, commentId, vote}) => {
        return await tryCatchWithApolloErrorAsync(async() => {
          return this.voteService.setVote(companyId, commentId, vote);
        });
      }
    };
}();