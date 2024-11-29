import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Centered } from '@/components/Centered';
import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useUserSignupMutation } from '@/api/user.api';

export interface SignupInitialValues {
  email: string;
  name: string;
  password: string;
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [createUserRequest] = useUserSignupMutation();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const initialValues: SignupInitialValues = {
    email: '',
    password: '',
    name: '',
  };

  const createUser = async (values: SignupInitialValues, fn: any) => {
    try {
      const response = await createUserRequest(values).unwrap();

      toast(response.message, { type: 'success' });
      navigate('/login');
    } catch (error) {
      toast((error as Error).message, { type: 'error' });
      fn.resetForm();
    }
  };

  return (
    <Centered>
      <div className="p-7 w-full md:w-1/2 xl:w-1/4 lg:w-1/3 xl:dark:bg-secondary rounded-xl">
        <h2 className="text-center font-bold text-2xl">Create account</h2>
        <p className="mt-5 mb-5 text-sm text-center">
          Create an account and listen to your favorite songs without
          restrictions
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={createUser}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-secondary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@email.com"
                />
                {errors.email && touched.email && (
                  <span className="text-sm text-red-500">{errors.email}</span>
                )}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Alex"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-secondary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.name && touched.name && (
                  <span className="text-sm text-red-500">{errors.name}</span>
                )}
              </div>
              <div className="mb-5 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="********"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-secondary dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-lg absolute right-3 top-3"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <span className="text-sm text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-10 text-sm">
          You have an account? Let's{' '}
          <Link to="/login" className="text-blue-500">
            login
          </Link>
        </p>
      </div>
    </Centered>
  );
}