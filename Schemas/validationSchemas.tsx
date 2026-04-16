import * as yup from 'yup';

export const loginSchema = yup.object({
    username: yup.string().min(4, 'Username must be at least 4 characters').max(100, 'Username cannot exceed 100 characters').required('Username is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').max(100, 'Password cannot exceed 100 characters').required('Password is required'),
})