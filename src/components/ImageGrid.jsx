import { useState } from 'react';
import ImageCard from './ImageCard';
import './ImageGrid.css';

function ImageGrid({ data, searchQuery, onParameterClick, globalShowText }) {
  const filteredData = data.filter(item => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    
    // Check parameters
    const hasMatchingParameter = Array.from(item.parameters || []).some(param => 
      param.toLowerCase().includes(searchLower)
    );
    
    // Check full text in all images
    const hasMatchingText = item.images.some(img => 
      img.fullText?.toLowerCase().includes(searchLower)
    );
    
    return hasMatchingParameter || hasMatchingText;
  });

  return (
    <div className="image-grid">
      {filteredData.map((item) => (
        <ImageCard 
          key={item.sref}
          images={item.images || []}
          parameters={Array.from(item.parameters || [])}
          onParameterClick={onParameterClick}
          searchQuery={searchQuery}
          globalShowText={globalShowText}
        />
      ))}
    </div>
  );
}

export default ImageGrid; 