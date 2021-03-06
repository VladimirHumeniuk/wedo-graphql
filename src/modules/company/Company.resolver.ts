import { ValidationError } from 'apollo-server';
import { adminService } from '../../setup';
import { Company } from '../../models';
import { tryCatchWithApolloErrorAsync } from '../../helpers/error-handler.helper';
import { api } from '../../helpers/configuration-provider.helper';

export const CompanyResolver = new class {
  Query = {
    async getAllCompanies(_: null, args: any) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const companiesQuery = await adminService
          .firestore()
          .collection(api.companies)
          .get();
        return companiesQuery.docs.map(company => company.data()) as Company[];
      });
    },

    async getCompany(_: null, { cid = null }) {
      if (!cid) return null;
      return await tryCatchWithApolloErrorAsync(async () => {
        const companyDoc = await adminService
          .firestore()
          .doc(`${api.companies}/${cid}`)
          .get();
        const company = companyDoc.data() as Company | undefined;
        return company || new ValidationError('Company ID not found');
      });
    }
  };

  Mutation = {
    async assignCompany(_: null, { userId, companyId }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        const userRef = adminService.firestore().collection(api.users).doc(userId);
        const companyRef = adminService.firestore().collection(api.companies).doc(companyId);

        await userRef.set({ company: companyId }, { merge: true });
        await companyRef.set({ cid: companyId }, { merge: true });

        return true;
      })
    },
    async removeCompany(_: null, { cid }) {
      return await tryCatchWithApolloErrorAsync(async () => {
        await adminService
          .firestore()
          .collection(api.companies)
          .doc(`${cid}`)
          .delete()

        return true;
      });
    }
  }
}