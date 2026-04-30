export type PostFormData = {
  category: string;       // "electronics" | "cars" | "real-estate" | "furniture" | "clothing" | "jobs"
  title: string;
  description: string;
  price: string;          // keep as string in the form, parse to number on submit
  currency: "USD" | "SYP";
  condition: "new" | "used" | "";
  city: string;
  attrs: Record<string, string | number | boolean>;
  image_urls: string[];   // empty array for now — R2 comes later
}

export const EMPTY_POST_FORM: PostFormData = {
  category: "",
  title: "",
  description: "",
  price: "",
  currency: "USD",
  condition: "",
  city: "",
  attrs: {},
  image_urls: []
}