import axios from "axios";

type fetchApiTypeAgrs = {
    url: string;
    method?: Method;
    data?: DataType;
    headers?: HeadersType;
};

enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
  }
  
  type DataType = Record<string, any> | null;
  type HeadersType = Record<string, string>;


  /** 
  * This helper fetch data from url and return the isLoading respond states
  * @param {string} url path to api call
  * @param {Method} method path to api call GET = "GET",POST = "POST",PUT = "PUT",DELETE = "DELETE",
  * @param {any} request req body to api
  * @param {object} header req header to api call
  * @returns {StateType} axios data
*/
const fetchAPI = async ({ url, method, data, headers }:fetchApiTypeAgrs) => {
  try {
    let res: any[];;

    if (method === Method.GET) {
      res = await axios.get(url, { headers: headers });
    } else {
      res = await axios({
        method: method,
        url: url,
        data: data,
        headers: headers,
      });
    }
    
    return res;

  } catch (error) {
    console.error(error);
  }
};

export { fetchAPI,Method };
