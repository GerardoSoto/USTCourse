import { Auth } from "../Auth/Auth";
import type { IAuth } from "../Auth/IAuth";
import { LoginErroMessage } from "../Auth/logginErrorMessage";


/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = "http://localhost:3000/auth";

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } 

  if (response.status == "400"){
    return response;
  }
   else
  {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

function convertToAuthtModel(item: any): IAuth | LoginErroMessage {
  if (item.accessToken) 
    return new Auth(item);
  else 
    return new LoginErroMessage(item);
}

function saveToLocalStorage(user: any):IAuth | LoginErroMessage{
  if(user.accessToken){
    localStorage.setItem("user",JSON.stringify(user));
  }

  return user;
  
}


const authServiceAPI = {
  login(email:string, password:string){
    return fetch(`${API_URL}/signin`,{
      method:'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(checkStatus)    
    .then(parseJSON)
    .then(convertToAuthtModel)
    .then(saveToLocalStorage)
    .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error to login. Please try again.'
        );
      });
  },
  logout(){
    //Todo: Call to backend service to delete the token
    localStorage.removeItem("user");
    
  },
  register(name:string, email:string, password:string){
    return fetch(`${API_URL}/signup`,{
      method:'post',
      body: JSON.stringify({
        name,
        email,
        password
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(checkStatus)    
    .then(parseJSON)
    .then(convertToAuthtModel)
    .then(saveToLocalStorage)
    .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error to register. Please try again.'
        );
      });

  },
  getCurrentUser(){
    const currentUser = localStorage.getItem('user');

    if(currentUser){
      return JSON.parse(currentUser);
    }
    
  }
};


export { authServiceAPI };