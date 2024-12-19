import React from 'react';
import { CATEGORIES, CategoryType } from '../../constants/categories';

interface CategoryTagProps {
  category: CategoryType;
  className?: string;
}

export function CategoryTag({ category, className = '' }: CategoryTagProps) {
  const categoryInfo = CATEGORIES[category];
  
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${className}`}
      style={{
        backgroundColor: `${categoryInfo.color}20`,
        color: categoryInfo.color
      }}
    >
      {categoryInfo.label}
    </span>
  );
}