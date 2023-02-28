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
export interface Transaction {
  type: string;
  name: string;
  amount: number;
  createdAt: string
}

export interface TransactionsApi extends Transaction{
  id: string
}


export interface TransactionsFromFirebase {
  [id: string]: TransactionPost;
}

export interface TransactionMutation extends Transaction {
  amount: string;
}
