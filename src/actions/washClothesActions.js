import {securedPost} from "../oauth2/xhr";

export const putClothes = () => (dispatch) => {
  dispatch(
    //tODO: create put methods in rest api
    securedPost(process.env.API_URL + '/resource/put-clothes-to-basket/')).then(
    response => {
      //  dispatch({type: LOAD_SUPPLIER, data: response.data});
    });
};
