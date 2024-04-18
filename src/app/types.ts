export interface StrapiResponse {
  data: Datum;
  meta: Meta;
}

export interface Datum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  sectionTitle: string;
  sectionDescription: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cards: Card[];
}

export interface Card {
  id: number;
  title: string;
  description?: string;
  date: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
