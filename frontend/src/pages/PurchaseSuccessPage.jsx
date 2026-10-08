import { CheckCircle, HandHeart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti';

const PurchaseSuccessPage = () => {
  return (
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >

    <Confetti
    numberOfPieces={400}
    recycle={false}
    colors={['#dc2626', '#ef4444', '#f87171']}
    />

    <div className="flex px-4 items-center justify-center h-full mt-8">

        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">

            <div className="p-2 sm:p-8">
                <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 mb-4 text-red-300" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-400 mb-2">
                     Purchase Successful... Unfortunately.
                </h1>
                <p className="text-red-400 text-center mb-2">
                    Thank you for funding our mysterious activities. Your contribution will not be forgotten.
                </p>
                <p className="text-red-400 text-center mb-6 text-sm">
                    A confirmation email is kama on its way.
                </p>
                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-red-400">
                            Order ID:
                        </span>
                        <span className="text-sm font-semibold text-red-400">
                            21a3b79c
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-red-400">
                            estimate delivery
                        </span>
                        <span className="text-sm font-semibold text-red-400">
                            18 thousand weeks
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center" >
                        <HandHeart className="mr-2" size={18} />
                        We appreciate your loss!   
                    </button>
                    <Link to={'/'}className="w-full bg-gray-600 hover:bg-gray-700 text-red-400 font-bold py-2 px-4  transition duration-300 flex items-center rounded-lg justify-center" >
                        <ArrowRight className="mr-2" size={18} />
                        Continue making poor decisions
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </motion.div>
  )
}

export default PurchaseSuccessPage