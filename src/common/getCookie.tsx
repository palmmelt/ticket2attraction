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
  
  const cartItems = getCookie('cartItems');
  

  export { getCookie };