import { useEffect, useState } from "react";
import axios from "axios";
import { fetchAPI } from "../common/fetchAPI";

type useFetchArgsType = {
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

type StateType = {
  isLoading: boolean;
  respond: {
    data: any[];
  };
};

/** 
  * This hook fetch data from url and return the isLoading respond states
  * @param {string} url path to api call
  * @param {Method} method path to api call GET = "GET",POST = "POST",PUT = "PUT",DELETE = "DELETE",
  * @param {any} data req body to api
  * @param {object} header req header to api call
  * @returns {StateType} [isLoading , respond]
*/
const useFetch = ({
  url,
  method = Method.GET,
  data = null,
  headers = {},
}: useFetchArgsType): [boolean, any[]] => {
  const [state, setState] = useState<StateType>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await fetchAPI({ url, method, data, headers });
        if (res) {
          setState({
            isLoading: false,
            respond: {
              data: res.data.data,
            },
          });
          console.log(res);
        } else {
          console.error("Response is undefined");
        }
      } catch (error) {
        console.error(error);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      }
    };

    fetchData();
  // }, [url, method, data, headers]);
  }, []);

  return [state.isLoading, state.respond.data];
};

const initialState: StateType = {
  isLoading: true,
  respond: {
    data: [],
  },
};

export { useFetch };
