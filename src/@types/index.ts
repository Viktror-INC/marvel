export type THeroesList = THeroList[];

export type THeroList = {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string };
  comics: { items: { name: string }[] };
};
