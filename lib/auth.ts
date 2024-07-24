import {CredentialsProvider} from 'next-auth/providers';

export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'}
                placeholder: 'example@example.com',
            },
            password: { label: 'Password', type: 'password' },
            async authorize(credentials) {
                const user = {id: 1, name: 'J Smith', email: '
        })
    ],
};
}