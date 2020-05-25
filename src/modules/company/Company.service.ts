import { Singleton } from '../../decorators/singleton';
import { adminService } from '../../setup';
import { api } from '../../helpers/configuration-provider.helper';
import { CompanyRepository } from './Company.repository';
import { Company } from '../../models';
import { ValidationError } from 'apollo-server';

@Singleton
export class CompanyService {
  private readonly companyReposity = new CompanyRepository();

  async getAllEntities(): Promise<Company[]> {
    const query = this.companyReposity.getAllEntities();
    const companySnapshots = await query.get();
    const companies = companySnapshots.docs.map(company => company.data()) as Company[];
    return companies;
  }

  async getEnitity(companyId: string): Promise<Company | undefined> {
    const query = this.companyReposity.getEnitity(companyId);
    const companySnapshot = await query.get();
    const company = companySnapshot.data() as Company | undefined;
    return company;
  }
}