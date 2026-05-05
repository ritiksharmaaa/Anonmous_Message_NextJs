import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User.model';

const normalizeUsername = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 24);

const buildUniqueUsername = async (base: string) => {
  let candidate = normalizeUsername(base) || `user${Date.now().toString().slice(-6)}`;
  let exists = await UserModel.findOne({ username: candidate }).lean();
  while (exists) {
    const suffix = Math.floor(1000 + Math.random() * 9000).toString();
    candidate = `${candidate.slice(0, 20)}${suffix}`;
    exists = await UserModel.findOne({ username: candidate }).lean();
  }
  return candidate;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        await dbConnect();
        if (!credentials) {
          return null;
        }
        try {
          const { identifier, password } = credentials as {
            identifier: string;
            password: string;
          };

          const user = await UserModel.findOne({
            $or: [
              { email: identifier },
              { username: identifier },
            ],
          });

          if (!user) {
            return null;
          }

          if (!user.isVerified) {
            throw new Error('Please verify your account before logging in');
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            return null;
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github' || account?.provider === 'google') {
        await dbConnect();
        try {
          const existingUser = await UserModel.findOne({ email: user.email });
          if (existingUser) {
            return true;
          }
          const emailPrefix = user.email?.split('@')[0] ?? `user${Date.now().toString().slice(-6)}`;
          const username = await buildUniqueUsername(emailPrefix);
          const newUser = new UserModel({
            username,
            email: user.email,
            isVerified: true,
            isAcceptingMessages: true,
          });
          await newUser.save();
          return true;
        } catch (error) {
          console.error("Error saving OAuth user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }

      if (account?.provider === "github" || account?.provider === "google") {
        await dbConnect();
        const dbUser = await UserModel.findOne({ email: token.email });
        if (dbUser) {
          token._id = dbUser._id?.toString();
          token.isVerified = dbUser.isVerified;
          token.isAcceptingMessages = dbUser.isAcceptingMessages;
          token.username = dbUser.username;
        }
      }

      if (!token._id && token.email) {
        await dbConnect();
        const dbUser = await UserModel.findOne({ email: token.email });
        if (dbUser) {
          token._id = dbUser._id?.toString();
          token.isVerified = dbUser.isVerified;
          token.isAcceptingMessages = dbUser.isAcceptingMessages;
          token.username = dbUser.username;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

