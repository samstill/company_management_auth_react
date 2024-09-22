// utils.ts
export function setDatasets(data: any) {
  if (!data || !Array.isArray(data)) {
    console.error('Data is not an array or is undefined:', data);
    return;
  }

  // Perform your mapping over the dataset
  return data.map(item => {
    return {
      label: item.label,
      value: item.value,
    };
  });
}
