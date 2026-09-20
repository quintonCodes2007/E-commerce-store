import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import CartItem from '../components/CartItem';
import PeopleAlsoBought from '../components/PeopleAlsoBought';

const CartPage = () => {

  const { cart } = useCartStore();

  return (
    <div className='py-8 md:py-16'>
      <div className='mx-auto max-w-7xl px-4 2xl:px-0'>
        <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gab-8'>
          <motion.div
              className='flex flex-col items-center justify content space-y-4 py-16'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay:0.5}}
          >
            {cart?.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className='space-y-6'>
                {cart?.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
            {cart?.length > 0 && <PeopleAlsoBought />}
          </motion.div>
          </div>
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div 
    className='flex flex-col items-center justify content space-y-4 py-16'
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5}}
  >
    <ShoppingCart className='h-24 w-24 text-gray-400' />
    <h3 className='text-2xl font-semibold'>Your cart is empty</h3>
    <p className='text-gray-500'>Go ahead and add some items to your cart.</p>
    <Link to='/products' className='mt-4 text-gray-500 hover:text-gray-600'>
      <span className='text-sm'>Browse products</span>
      <span className='text-gray-500 text-sm'>&rarr;</span>
    </Link>

  </motion.div>
);

