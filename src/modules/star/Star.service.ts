import { Star } from './Star';
import { StarRepository } from './Star.repository';
import { Singleton } from '../../decorators/singleton';

@Singleton
export class StarService {
    private readonly starRepository: StarRepository = new StarRepository();

    async getAllEntities(companyId: string): Promise<Star[]> {
        const query = this.starRepository.getAllEntities()
            .where('cid', '==', companyId);

        const starSnapshots = await query.get();
        const stars = starSnapshots.docs.map(star =>  star.data()) as Star[];
        return stars;
    }
}