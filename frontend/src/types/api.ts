export type ApiResult = {
  id:number,
  name: string
}

export type Ad = {
  id: number;
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


