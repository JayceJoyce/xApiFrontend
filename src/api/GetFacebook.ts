export const getApi = async (url:string) =>{
let res 
await window.FB.api(
              url,
              "get",
              {},
    function(response) {
      res = response;
    }
  );
  return res;
}