export interface DataItem extends AddDataItemInput {
  id: number;
}

export interface Vote {
  user: string;
  vote: number;
}

export interface Story extends CreateStoryInput {
  id: string;
  lastUpdatedAt: string;
  archived: boolean;
  votes: Vote[];
}

export interface CreateStoryInput {
  fullData: string;
  imageUrl?: string;
  dataItems: DataItem[];
}

export interface UpdateStoryInput {
  fullData?: string;
  archived?: boolean;
}

export interface AddDataItemInput {
  content: string;
  referenceUrl?: string;
  writtenby: string;
}

export type AddVoteInput = Vote;
