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

export interface TransactionPost {
  category: string;
  amount: number;
  createdAt: string;
}