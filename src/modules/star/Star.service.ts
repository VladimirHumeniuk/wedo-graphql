import { Star } from './Star';
import { StarRepository } from './Star.repository';
import { Singleton } from '../../decorators/singleton';
import { ObjectHelper } from '../../helpers/object.helper';

@Singleton
export class StarService {
  private readonly starRepository: StarRepository = new StarRepository();

  async getCompanyStars(companyId: string): Promise<Star[]> {
    const query = this.starRepository.getAllEntities()
      .where('cid', '==', companyId);

    const starSnapshots = await query.get();
    const stars = starSnapshots.docs.map(star => star.data()) as Star[];
    return stars;
  }

  async getUserStars(userId: string): Promise<Star[]> {
    const query = this.starRepository.getAllEntities()
      .where('uid', '==', userId);

    const starSnapshots = await query.get();
    const stars = starSnapshots.docs.map(star => star.data()) as Star[];
    return stars;
  }

  async setStar(star: Star): Promise<boolean> {
    const {
      uid,
      cid,
    } = star;
    const query = this.starRepository.getAllEntities()
      .doc(`${uid}_${cid}`)

    const starToSave = ObjectHelper.convertToPlainObject(star);
    await query.set(starToSave, { merge: true });
    return true;
  }
}