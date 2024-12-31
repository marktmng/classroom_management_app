// utils/auth.ts (or signUp.ts)
import { Clerk } from '@clerk/clerk-sdk-node';

const clerkClient = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

export const createUser = async (email: string, password: string, role: string, classroomCode: string, studentId: string) => {
  try {
    const user = await clerkClient.users.create({
      emailAddress: email,
      password,
      publicMetadata: { role, classroomCode, studentId },
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};
