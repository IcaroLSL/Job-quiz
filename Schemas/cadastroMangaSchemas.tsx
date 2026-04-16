import * as yup from 'yup';

export const cadastroMangaSchema = yup.object({
    name: yup.string().min(3, 'Name must be at least 3 characters').max(100, 'Name cannot exceed 100 characters').required('Name is required'),
    genre: yup
        .mixed<string | string[]>()
        .test('genre-required', 'Genre is required', (value) => {
            if (Array.isArray(value)) {
                return value.length > 0;
            }

            return typeof value === 'string' && value.trim().length > 0;
        })
        .required('Genre is required'),
    url: yup.string().url('Must be a valid URL').required('URL is required'),
    image: yup.string().url('Must be a valid URL').required(),
    author: yup.string().min(3, 'Author must be at least 3 characters').max(100, 'Author cannot exceed 100 characters').required('Author is required'),
    status: yup.string().oneOf(['ongoing', 'completed', 'hiatus', undefined], 'Status must be one of: ongoing, completed, hiatus').required('Status is required'),
})