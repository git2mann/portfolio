
export type Annotation = {
  id: string;
  lines: string[];
  explanation?: string;
};

export interface Song {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
  lyrics: Annotation[];
}

export type Album = {
  id: string;
  title: string;
  coverImage: string;
  releaseYear: string;
  description: string;
  songs: Song[];
};
