export const filterFunction = (dataset = [], searchBy = [], filterTerms = {}, searchTerm = "") => {
  const filteredData = dataset.filter(item => {
      // Ensure item is not null or undefined
      if (!item) return false;

      // Search function
      const searchedList = searchBy.length 
          ? searchBy.some(col => String(item[col] || "").toLowerCase().includes(searchTerm.toLowerCase())) 
          : true;

      // Filter function
      const filteredList = Object.keys(filterTerms).every(key => {
          if (!(key in item) && !['minAge', 'maxAge', 'minTotalAbsence', 'maxTotalAbsence', 'from', 'to'].includes(key)) {
              return true; // Ignore unknown keys
          }

          switch (key) {
              case 'minAge':
                  return item.age && item.age >= filterTerms.minAge;
              case 'maxAge':
                  return item.age && item.age <= filterTerms.maxAge;
              case 'minTotalAbsence': 
                  return item.totalAbsence && item.totalAbsence >= filterTerms.minTotalAbsence;
              case 'maxTotalAbsence':
                  return item.totalAbsence && item.totalAbsence <= filterTerms.maxTotalAbsence;
              case 'from': 
                  return item.date && new Date(item.date) >= new Date(filterTerms.from);
              case 'to': 
                  return item.date && new Date(item.date) <= new Date(filterTerms.to);
              default:
                  return item[key] === filterTerms[key];
          }
      });

      return searchedList && filteredList;
  });

  return filteredData;
};
