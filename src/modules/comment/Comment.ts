import { Vote } from '../vote/Vote';

interface Answer {
  date?: any
  text?: String
  isEdited?: Boolean
}

export interface Comment {
  id?: string;
  date?: any;
  text?: string;
  author?: {
    uid: string;
    username: string;
  };
  isEdited?: boolean;
  rating?: number;
  answer?: Answer;
  votes: Vote[];
}
