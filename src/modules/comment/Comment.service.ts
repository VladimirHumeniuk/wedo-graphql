import { Singleton } from '../../decorators/singleton';
import { adminService } from '../../setup';
import { api } from '../../helpers/configuration-provider.helper';
import { CompanyRepository } from '../company/Company.repository';
import { CommentRepository } from './Comment.repository';
import { VoteService } from '../vote/Vote.service';
import { Comment } from './Comment';

@Singleton
export class CommentService {

    private readonly commentRepository: CommentRepository = new CommentRepository();
    private readonly voteService: VoteService = new VoteService();

    async getAllEntities(companyId: string): Promise<Comment[]> {
        const query = this.commentRepository.getAllEntities(companyId);
          
        const commentsSnapshots = await query.get();
        const comments = commentsSnapshots.docs.map(comment =>  comment.data()) as Comment[];

        for(const comment of comments) {
            const votes = await this.voteService.getAllEntities(companyId, comment.id);
            comment.votes = votes;
        }

        comments.sort(this.sortCommentsByPositiveVotes);
        return comments;
    }

    async getEnitity(companyId: string, commentId: string): Promise<Comment | undefined> {
        const query = this.commentRepository.getEnitity(companyId, commentId);;
        const commentSnapshot = await query.get();
        const comment = commentSnapshot.data() as Comment | undefined;
        return comment;
    }

    private sortCommentsByPositiveVotes(a: Comment, b: Comment) {
        const positiveVotesA = a.votes.filter(vote => vote.value === true);
        const positiveVotesB = b.votes.filter(vote => vote.value === true);

        if (positiveVotesA.length < positiveVotesB.length) {
            return 1;
        } else if (positiveVotesA.length > positiveVotesB.length) {
            return -1
        } else {
            return 0;
        }
    }
}