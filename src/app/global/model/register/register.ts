import SystemConstants from 'src/app/utils/constants/system/system.constants';
import { UserRoles } from '../../../utils/constants/user-roles/user.roles';

export const registerUserSelectRole = [
    {value: SystemConstants.STUDENT, role: UserRoles.USER},
    {value: SystemConstants.ADMIN, role: UserRoles.ADMIN}
] as const;

export const educationList = ['Elementary', 'Middle School', 'High School'] as const;
export const departmentList = [
    'Biology', 'Computer Science', 'History',
    'Mathematics', 'Physics', 'Accounting',
    'Economics and Finance', 'Counseling',
    'Human Services', 'Health'] as const;
export const subjectList = ['Math', 'Biology', 'Arts', 'Commerce'] as const;
