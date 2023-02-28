export interface Category {
  type: string;
  name: string;
}
export interface CategoryApi extends Category{
  id: string;
}

export interface CategoriesFromFirebase {
  [id: string]: Category;
}