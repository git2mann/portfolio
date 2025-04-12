export type Annotation = {
  id: string;
  text: string;
  explanation?: string;
};

export interface Song {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
  lyrics: Array<{
    id: string;
    text: string;
    explanation?: string;
  }>;
}

export type Album = {
  id: string;
  title: string;
  coverImage: string;
  releaseYear: string;
  description: string;
  songs: Song[];
};
