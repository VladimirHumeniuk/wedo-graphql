import { Singleton } from '../../decorators/singleton';
import { adminService } from '../../setup';
import { api } from '../../helpers/configuration-provider.helper';

@Singleton
export class CompanyRepository {

  getAllEntities(): FirebaseFirestore.CollectionReference {
    const query = adminService
      .firestore()
      .collection(api.companies);

    return query;
  }

  getEnitity(cid: string): FirebaseFirestore.DocumentReference {
    const query = this
      .getAllEntities()
      .doc(cid);

    return query;
  }
}