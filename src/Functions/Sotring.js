 function numberSorting (a,b,mode) {
    return mode === 'ASC' ? a - b : b - a
  }
   function  stringsSotring (a,b,mode){
    const nameA = String(a).toLowerCase(); // ignore upper and lowercase
    const nameB = String(b).toLowerCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return mode === 'ASC' ? -1 : 1;
    }
    if (nameA > nameB) {
      return mode === 'ASC' ? 1 : -1;
    }
  
    // names must be equal
    return 0;
  }
export function sortList  (a,b ,sortBy){
    return isNaN(a[sortBy.col]) ? 
    stringsSotring(a[sortBy.col],b[sortBy.col],sortBy.mode)
    : numberSorting(a[sortBy.col],b[sortBy.col],sortBy.mode)
}