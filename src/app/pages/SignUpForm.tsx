'use client';

import { SignInButton, useClerk } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Zod schema for validation
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['teacher', 'student']),
  classroomCode: z.string().min(1),
  studentId: z.string().min(6).max(6),
});

// Define the type for the form data based on the schema
type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { signUp } = useClerk();  // Access signUp object from useClerk()
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const { role, classroomCode, studentId, email, password } = data;

      // Create user using Clerk's frontend sign-up API
      await signUp.create({
        emailAddress: email,
        password,
        metadata: {
          role, // Storing the role in user metadata
          classroomCode,
          studentId,
        },
      });

      // Redirect user to the appropriate dashboard based on the role
      window.location.href = role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard';
    } catch (error) {
      console.error('Error during sign up:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4" style={{ fontSize: '16px', color: 'black' }}>
      <input
        {...register('email')}
        placeholder="Email"
        className="border p-2"
        style={{ fontSize: '16px', color: 'black' }} // Ensures black text
      />
      {errors.email && <span style={{ color: '#FFA500', fontSize: '12px' }}>{errors.email?.message}</span>} {/* Error styling */}

      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className="border p-2"
        style={{ fontSize: '16px', color: 'black' }} // Ensures black text
      />
      {errors.password && <span style={{ color: '#FFA500', fontSize: '12px' }}>{errors.password?.message}</span>} {/* Error styling */}

      <label style={{ fontSize: '16px', color: 'black' }}>
        Role:
        <select {...register('role')} className="border p-2" style={{ fontSize: '16px', color: 'black' }}>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </label>

      <input
        {...register('classroomCode')}
        placeholder="Classroom Code"
        className="border p-2"
        style={{ fontSize: '16px', color: 'black' }} // Ensures black text
      />
      {errors.classroomCode && <span style={{ color: '#FFA500', fontSize: '12px' }}>{errors.classroomCode?.message}</span>} {/* Error styling */}

      <input
        {...register('studentId')}
        placeholder="6-Digit ID"
        className="border p-2"
        style={{ fontSize: '16px' }} // Ensures black text
      />
      {errors.studentId && <span style={{ color: '#FFA500', fontSize: '12px' }}>{errors.studentId?.message}</span>} {/* Error styling */}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2"
        style={{ fontSize: '16px', color: 'black' }} // Ensures black text
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>

      {/* Sign In Button */}
      <div className="mt-4">
        <SignInButton>
          <button type="button" className="bg-green-500 text-white p-2 w-full" style={{ fontSize: '16px' }}>
            Sign In with google
          </button>
        </SignInButton>
      </div>
    </form>
  );
};

export default SignUp;
