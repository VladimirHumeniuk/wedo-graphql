import { tryCatchWithApolloErrorAsync } from '../../helpers/error-handler.helper';
import { StarService } from './Star.service';

export const StarResolver = new class {
  private readonly starService: StarService = new StarService();

  Query = {
    getCompanyStars: async (_: null, { cid }) => {
      return await tryCatchWithApolloErrorAsync(async () => {
        return this.starService.getCompanyStars(cid);
      });
    },

    getUserStars: async (_: null, { uid }) => {
      return await tryCatchWithApolloErrorAsync(async () => {
        return this.starService.getCompanyStars(uid);
      });
    }
  };

  Mutation = {
    setStar: async (_: null, { star }) => {
      return await tryCatchWithApolloErrorAsync(async () => {
        return this.starService.setStar(star);
      });
    }
  };
}();