import { Singleton } from '../../decorators/singleton';
import { adminService } from '../../setup';
import { api } from '../../helpers/configuration-provider.helper';
import { CompanyRepository } from '../company/Company.repository';
import { CommentRepository } from './Comment.repository';
import { VoteService } from '../vote/Vote.service';
import { Comment } from './Comment';
import { ValidationError } from 'apollo-server';
import { ObjectHelper } from '../../helpers/object.helper';

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

    async setComment(companyId: string, comment: Comment): Promise<ValidationError | boolean> {
        if (!comment.id) {
            return new ValidationError('Comment does not have id');
        }

        const query = this.commentRepository.getEnitity(companyId, comment.id);
        const commentInDb = query.get();

        if (!commentInDb) {
            return new ValidationError(`Comment with ID:[${comment.id}] is not found`);
        }

        const commentToSet = ObjectHelper.convertToPlainObject(comment);
        await query.set(commentToSet, { merge: true });
        return true;
    }

    async addComment(companyId: string, comment: Comment): Promise<boolean> {
        const query = this.commentRepository.getAllEntities(companyId);
        const commentToAdd = ObjectHelper.convertToPlainObject<Comment>(comment);
        const reference = query.doc();
        commentToAdd.id = reference.id;
        commentToAdd.date = adminService.firestore.FieldValue.serverTimestamp();
        await reference.set(commentToAdd);
        return true;
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