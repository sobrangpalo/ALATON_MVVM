
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white p-5 mb-4 mx-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow animate-fadeIn">
      <div className="flex-1 pr-4">
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1 block">
          {product.category}
        </span>
        <h3 className="text-base font-black text-gray-900 leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-2 italic">
          {product.description}
        </p>
        <p className="text-gray-900 font-extrabold text-lg">
          ₱{product.price.toLocaleString()}
        </p>
      </div>
      <div className="relative group">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-24 h-24 rounded-2xl object-cover bg-gray-50 shadow-inner group-hover:scale-105 transition-transform"
        />
        <button 
          onClick={() => onAddToCart?.(product)}
          className="absolute -bottom-2 -right-2 bg-black text-white p-2 rounded-xl shadow-lg hover:bg-blue-600 active:scale-90 transition-all cursor-pointer"
        >
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
