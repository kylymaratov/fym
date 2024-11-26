import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { UseApi } from '@/api/api';
import { Link, useNavigate } from 'react-router-dom';
import { Centered } from '@/components/Centered';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { UserContext } from '@/context/UserContext';
import { UserTypes } from '@/types/user.types';

interface InitialValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const { request } = UseApi();
  const navigate = useNavigate();
  const { setUserState } = useContext(UserContext);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const initialValues: InitialValues = {
    email: '',
    password: '',
  };

  const loginUser = async (values: InitialValues, fn: any) => {
    try {
      const response = await request(
        '/auth/login',
        'POST',
        JSON.stringify({ ...values, rememberMe }),
      );

      const { data } = await request<UserTypes>('/user/me');

      setUserState('user', data);

      toast(response.data?.message, { type: 'success' });
      navigate('/');
    } catch (error) {
    } finally {
      fn.resetForm();
    }
  };

  return (
    <Centered>
      <div className="p-7 w-full md:w-1/2 xl:w-1/4 lg:w-1/3 xl:dark:bg-secondary rounded-xl">
        <h2 className="text-center font-bold text-2xl">Welcome to Songfiy</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={loginUser}
        >
          {({ errors, touched }) => (
            <Form className="mt-5">
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
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login via email
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-center mt-10 text-sm">
          You don't have account? let's{' '}
          <Link to="/signup" className="text-blue-500">
            create
          </Link>
        </p>
      </div>
    </Centered>
  );
}
