import { Singleton } from '../../decorators/singleton';
import { VoteRepository } from './Vote.repository';
import { Vote } from './Vote';
import { ValidationError } from 'apollo-server';
import { ObjectHelper } from '../../helpers/object.helper';

@Singleton
export class VoteService {

    private readonly voteRepository: VoteRepository = new VoteRepository();

    async getAllEntities(companyId: string, commentId: string): Promise<Vote[]> {
        const query = this.voteRepository.getAllEntities(companyId, commentId);
        const voteSnapshots = await query.get();
        const votes = voteSnapshots.docs.map(company =>  company.data()) as Vote[];
        return votes;
    }

    async setVote(companyId: string, commentId: string, vote: Vote): Promise<ValidationError | boolean> {
        if (!vote.id) {
            return new ValidationError('Vote does not have id');
        }

        const query = this.voteRepository.getEnitity(companyId, commentId, vote.id);
        const voteInDb = query.get();

        if (!voteInDb) {
            return new ValidationError(`Vote with ID:[${vote.id}] is not found`);
        }

        const voteToSet = ObjectHelper.convertToPlainObject(vote);
        await query.set(voteToSet, { merge: true });
        return true;
    }
}