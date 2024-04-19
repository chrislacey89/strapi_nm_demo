export interface StrapiResponse {
  data: Data;
  meta: Meta;
}

export interface Data {
  attributes: Attributes;
  id: number;
}

export interface Attributes {
  cards: Card[];
  createdAt: Date;
  publishedAt: Date;
  sectionDescription: string;
  sectionTitle: string;
  updatedAt: Date;
}

export interface Card {
  date: Date;
  description: string;
  id: number;
  link: Link[];
  title: string;
}

export interface Link {
  id: number;
  linkText: string;
  linkUrl: string;
}

export interface Meta {}
