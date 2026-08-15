import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({  product }) => {

    const handleAddToCart = () => {
        toast.success(`${product.name} added to cart!`);
    }

  return (
    <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg '>
        <div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
            <img className='object-cover w-full' src={product.image} alt={product.name} />
            <div className='absolute inset-0 bg-black bg-opacity-70' />
        </div>

        <div className='mt-4 px-5 pb-5'>
            <h5 className='text-xl font-semibold tracking-tight text-red-300'>{product.name}</h5>
            <div className='mt-2 mb-5 flex items-center justify-between'>
                <p>
                    <span className='text-3xl font-bold text-red-500'>${product.price.toFixed(2)}</span>
                </p>
            </div>
            <button className='flex items-center justify-center rounded-lg bg-red-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800'
            onClick={handleAddToCart}
            >
                <ShoppingCart size={22} className='mr-2' />
                Add to cart
            </button>
        </div>
    </div>
  )
}

export default ProductCard