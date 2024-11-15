export type ApiResult = {
  id:number,
  name: string
}

export type Ad = {
  id: string;
  title: string;
  picture: string;
  description: string;
  location: string;
  createdAt: string;
  owner: string;
  price: number;
  category: ApiResult;
  tags: ApiResult[];
};


