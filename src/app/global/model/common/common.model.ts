import { CommonStatus } from "src/app/utils/constants/common/common.status";

export const userData = {_id: localStorage.getItem('id')};

export const commonAttributes = {
    limit: 10,
    skip: 0,
    maxSize: 5
} as const;

export type TypeAttribute<T, L> =
  {[K in keyof T]: T[K] } & Partial<L>;

export const actionList = [
    {action: 'Accept', status: CommonStatus.ACTIVE},
    {action: 'Reject', status: CommonStatus.DECLINE}
] as const;

export const showActionByColor = [
    {status: CommonStatus.ACTIVE, color: 'success'},
    {status: CommonStatus.PENDING, color: 'warning'},
    {status: CommonStatus.DECLINE, color: 'danger'},
] as const;
