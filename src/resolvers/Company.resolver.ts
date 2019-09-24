import { ApolloError, ValidationError } from 'apollo-server';
import { User } from '../models';
import { adminService } from '../setup';
import { Company } from '../models/Company';

export const CompanyResolver = {
  Query: {
    async getAllCompanies(_: null, args: any) {
      try {
        const companiesQuery = await adminService
          .firestore()
          .collection('companies')
          .get();
        return companiesQuery.docs.map(company => company.data()) as Company[];
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async getCompany(_: null, args: { cid: string }) {
      try {
        const companyDoc = await adminService
          .firestore()
          .doc(`companies/${args.cid}`)
          .get();
        const company = companyDoc.data() as Company | undefined;
        return company || new ValidationError('Company ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
  // async auth(_: null, args: any) {
  //   try {
  //     const auth = await admin.auth;
  //     return auth;
  //   } catch(error) {
  //     throw new ApolloError(error)
  //   }
  // }
}