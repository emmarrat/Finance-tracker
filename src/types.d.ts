export interface Category {
  type: string;
  name: string;
}
export interface CategoryApi extends Category{
  id: string;
}