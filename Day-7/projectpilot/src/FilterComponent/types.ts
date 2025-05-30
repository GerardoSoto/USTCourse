// types.ts (or wherever you keep your interfaces)
export interface ProjectQueryParams {
  category?: string;
  sort?: 'price' | 'name' | 'popularity';
  page?: string; // Query params are typically strings, even if they represent numbers
}