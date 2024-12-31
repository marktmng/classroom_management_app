import { Clerk } from '@clerk/clerk-sdk-node'; // Correct import statement

// Initialize Clerk SDK with the secret API key
const clerkClient = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, role, classroomCode, studentId } = req.body;

    try {
      // Create the user with the provided details
      const user = await clerkClient.users.create({
        emailAddress: email,
        password,
        metadata: { role, classroomCode, studentId },
      });

      // Respond with the newly created user
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);  // Log the error for debugging
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
