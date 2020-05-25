import { adminService } from '../setup';
import { tryCatchWithApolloErrorAsync } from '../helpers/error-handler.helper';
import { api } from '../helpers/configuration-provider.helper';
import { Alert, AlertData } from '../models';

export const AlertResolver = {
  Query: {
    async getAllAlerts(_: null, args: any) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const query = await adminService
          .firestore()
          .collection(api.alerts)
          .get();
        const data = query.docs.map(alert => ({
          id: alert.id,
          alerts: Object.values(alert.data()) as Alert[]
        })) as AlertData[];
        return data;
      });
    },
    async getAlerts(_: null, { uid }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const query = await adminService
          .firestore()
          .doc(`${api.alerts}/${uid}`)
          .get();

        const data = query.data();
        return data && Object.values(data) || [] as Alert[];
      });
    },
  },
  Mutation: {
    async addAlert(_: null, { uid, alert }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const copyAlert = { ...alert }
        await adminService
          .firestore()
          .collection(api.alerts)
          .doc(uid)
          .set({
            [copyAlert.code]: copyAlert
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