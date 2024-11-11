export function parseGalleryData(rawData) {
  if (!Array.isArray(rawData)) {
    console.error('Invalid data format:', rawData);
    return [];
  }

  // Group by sref codes
  const grouped = rawData.reduce((acc, item) => {
    if (!item?.full_text) return acc;

    const parameters = extractParameters(item.full_text);
    const srefCode = parameters.find(p => p.startsWith('--sref'))?.split(' ')[1];
    
    if (!srefCode) return acc;
    
    if (!acc[srefCode]) {
      acc[srefCode] = {
        sref: srefCode,
        images: [],
        parameters: new Set(),
        hasPersonalization: false
      };
    }
    
    if (item.thumbnail) {
      acc[srefCode].images.push({
        thumbnail: item.thumbnail,
        parameters,
        fullText: item.full_text
      });
    }
    
    parameters.forEach(param => {
      acc[srefCode].parameters.add(param);
      if (param.startsWith('--p') || param.startsWith('--personalize')) {
        acc[srefCode].hasPersonalization = true;
      }
    });
    
    return acc;
  }, {});

  return Object.values(grouped).filter(item => item.images.length > 0);
}

function extractParameters(text) {
  if (typeof text !== 'string') return [];
  const matches = text.match(/--\w+\s+[\w.:]+/g) || [];
  return matches.map(m => m.trim());
} 