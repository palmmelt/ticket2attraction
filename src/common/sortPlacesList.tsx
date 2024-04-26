
/** 
  * This helper static sort for places list
  * @param {string} sortby condition for sort
  * @param {string} array array for sort
  * @returns {object} new sort value
*/

const sortBy = (sortby: string, array: any[]): Array<any> => {
    let sortedPlaces = [...array];

    if (sortby === "nameAsc") {
        sortedPlaces = sortedPlaces.sort((a, b) => a.place.localeCompare(b.place));
      }
      if (sortby === "nameDesc") {
        sortedPlaces = sortedPlaces.sort((a, b) => b.place.localeCompare(a.place));
      }
    if (sortby === "priceAsc") {
      sortedPlaces = sortedPlaces.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (sortby === "priceDesc") {
      sortedPlaces = sortedPlaces.sort((a, b) => Number(b.price) - Number(a.price));
    }
    if (sortby === "default") {
        sortedPlaces = sortedPlaces.sort((a, b) => Number(a.id) - Number(b.id));
      }

    return sortedPlaces;
};

export {sortBy}
