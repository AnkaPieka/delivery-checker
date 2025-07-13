import React from 'react'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div className="flex items-center gap-4">
        <img
          src="../../logo.jpg"
          alt="logo du produit dashdoc"
          className="w-10 h-10"
        />
        <h1 className="text-white">Dashdoc</h1>
      </div>
      <div className="w-fit rounded-md shadow-sm bg-[#3a64f3] p-2">
        <h2 className="font-bold text-white text-xl">Delivery checker</h2>
      </div>
    </div>
  )
}

export default Header