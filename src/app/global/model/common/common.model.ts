export const userData = {_id: localStorage.getItem('id')};

export const commonAttributes = {
    limit: 10,
    skip: 0,
} as const;

export type TypeAttribute<T, L> =
  {[K in keyof T]: T[K] } & Partial<L>;