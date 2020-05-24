import { Singleton } from '../../decorators/singleton';
import { VoteRepository } from './Vote.repository';
import { Vote } from './Vote';

@Singleton
export class VoteService {

    private readonly voteRepository: VoteRepository = new VoteRepository();

    async getAllEntities(companyId: string, commentId: string): Promise<Vote[]> {
        const query = this.voteRepository.getAllEntities(companyId, commentId);
        const voteSnapshots = await query.get();
        const votes = voteSnapshots.docs.map(company =>  company.data()) as Vote[];
        return votes;
    }
}