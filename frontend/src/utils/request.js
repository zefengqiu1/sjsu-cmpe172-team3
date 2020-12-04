import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 5000
});



// Add a response interceptor
//  execute once get back
instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**
 * get
 * @param {*} url     
 * @param {*} params  
 */
export function get(url, params) {
  return instance.get(url, {
    params
  });
}

/**
 * post
 * @param {*} url    
 * @param {*} data   
 */
export function post(url, data) {
  return instance.post(url, data);
}

/**
 * put
 * @param {*} url    
 * @param {*} data    
 */
export function put(url, data) {
  return instance.put(url, data);
}

/**
 * delete
 * @param {*} url  
 */
export function del(url) {
  return instance.delete(url);
}
