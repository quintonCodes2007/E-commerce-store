import React from 'react'

const AdminPage = () => {


    <div className="relative min-h-creen text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
            <h1 className="text-center text-5xl font-bold sm:text-6xl text-red-400 mb-4">
                Browse Our Curiosities while testing the admin dashboard
            </h1>
            <p className="text-center text-xl text-gray-400 mb-12">
                Some artifacts choose their owner. The rest just scream until someone buys them.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <CategoryItem
                        category={category}
                        key={category.name}
                    />
                ))}
            </div>

        </div>
    </div>
}

export default AdminPage;