import { ApolloError, ValidationError } from 'apollo-server';
import { adminService } from '../setup';
import { tryCatchWithApolloErrorAsync } from '../helpers/error-handler.helper';
import { api } from '../helpers/configuration-provider.helper';
import { Alert } from '../models/Alert';

export const AlertResolver = {
  Query: {
    async getAllAlerts(_: null, args: any) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const query = await adminService
          .firestore()
          .collection(api.alerts)
          .get();
        return query.docs.map(alert => alert.data()) as Alert[];
      });
    },
  },
  Mutation: {
    async addAlert(_: null, { uid, alert }) {
      console.log(uid, alert);
      return await tryCatchWithApolloErrorAsync(async () => {
        await adminService
          .firestore()
          .collection(api.alerts)
          .doc(uid)
          .set({
            [alert.code]: alert
          }, { merge: true });
        return true;
      });
    },
    async removeAlert(_: null, { code, uid }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        await adminService
          .firestore()
          .collection(api.alerts)
          .doc(uid)
          .update({ [code.toString()]: adminService.firestore.FieldValue.delete() })
        return true;
      });
    }
  }
}