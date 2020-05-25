import { Singleton } from '../../decorators/singleton';
import { api } from '../../helpers/configuration-provider.helper';
import { CommentRepository } from '../comment/Comment.repository';

@Singleton
export class VoteRepository {

  private readonly commentRepository: CommentRepository = new CommentRepository();

  getAllEntities(companyId: string, commentId: string): FirebaseFirestore.CollectionReference {
    const query = this.commentRepository
      .getEnitity(companyId, commentId)
      .collection(api.votes);

    return query
  }
}