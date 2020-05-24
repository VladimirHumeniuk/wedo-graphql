import { Singleton } from '../../decorators/singleton';
import { api } from '../../helpers/configuration-provider.helper';
import { adminService } from '../../setup';

@Singleton
export class StarRepository {
    getAllEntities(): FirebaseFirestore.CollectionReference {
        const query = adminService
            .firestore()
            .collection(api.stars);

        return query;
    }

    getEnitity(starId: string): FirebaseFirestore.DocumentReference {
        const query = this
            .getAllEntities()
            .doc(starId);

        return query;
    }
}