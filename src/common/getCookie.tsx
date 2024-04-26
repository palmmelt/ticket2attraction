/** 
  * This helper get data from cookie return the any data of cookies
  * @param {string} name name cookie
  * @returns {any} cookie value
*/
const getCookie = (name:string) => {

    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  }
  
  

  export { getCookie };