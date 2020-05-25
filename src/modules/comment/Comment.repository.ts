import { Singleton } from '../../decorators/singleton';
import { adminService } from '../../setup';
import { api } from '../../helpers/configuration-provider.helper';
import { CompanyRepository } from '../company/Company.repository';

@Singleton
export class CommentRepository {

  private readonly companyRepository: CompanyRepository = new CompanyRepository();

  getAllEntities(companyId: string): FirebaseFirestore.CollectionReference {
    const query = this.companyRepository
      .getEnitity(companyId)
      .collection(`${api.comments}`);

    return query
  }

  getEnitity(companyId: string, commentId: string): FirebaseFirestore.DocumentReference {
    const query = this
      .getAllEntities(companyId)
      .doc(commentId);

    return query;
  }
}