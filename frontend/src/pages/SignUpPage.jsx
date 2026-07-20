import {useState} from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const SignUpPage = () => {

  const loading = true;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <motion.div
      className='sm:mx-auto sm:w-full max-w-md'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      >
        <h2 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>Create your account </h2>
      </motion.div>

      <motion.div
      className='sm:mx-auto sm:w-full max-w-md'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>

          <form onSubmit={handleSubmit} className='space-y-6'>
           <div>
            
            </div> 
          </form>

        </div>
      </motion.div>

    </div>

  )
}

export default SignUpPage