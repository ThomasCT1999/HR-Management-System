import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import jwt from 'jsonwebtoken';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      authorize: async (credentials) => {
        // Replace this with your own logic to authenticate the user
        const user = { id: 1, name: 'User', email: 'user@example.com' };
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async (session, token) => {
      session.user.id = token.id;
      return session;
    }
  }
});
