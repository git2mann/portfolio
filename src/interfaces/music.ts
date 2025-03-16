
export type Annotation = {
  id: string;
  text: string;
  explanation: string;
};

export type Song = {
  id: string;
  title: string;
  lyrics: Annotation[];
  audioUrl?: string;
  year: string;
};

export type Album = {
  id: string;
  title: string;
  coverImage: string;
  releaseYear: string;
  description: string;
  songs: Song[];
};
