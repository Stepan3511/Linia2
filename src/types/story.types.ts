export interface IStory {
  id: string;
  image: string;
  storiesId?: string;
}

export interface IStories {
  id: string;
  name: string;
  description?: string;
  stories: IStory[];
}

export interface IStoryInput {
  id: string;
  image: string;
  storiesId?: string;
}

export interface IStoriesInput {
  id?: string;
  name: string;
  description?: string;
  stories?: IStoryInput[];
}
