import React from 'react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            {item.category}
          </span>
        </div>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  );
}