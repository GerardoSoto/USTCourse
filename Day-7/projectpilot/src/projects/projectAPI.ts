/* eslint-disable @typescript-eslint/no-explicit-any */
import authHeader from '../services/auth-header';
import { Project } from './Project';
//const baseUrl = 'http://localhost:4000';
const baseUrl = 'http://localhost:3000/api';
const url = `${baseUrl}/projects`;

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
  } else {
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

// function parseText(response: Response) {
//   return response.text();
// }

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: any): Project[] {
  //console.log('Parsing data from Backens' + data)
  const projects: Project[] = data.projects.map(convertToProjectModel);
  return projects;
}

function convertToProjectModel(item: any): Project {
  return new Project(item);
}

const projectAPI = {
  // get(page = 1, limit = 20) {
    // return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
  // get() {
  //   return fetch(`${url}`, { headers:{
  //     authorization: authHeader()
  //   } 
  get() {
    return fetch(`${url}`, { headers: {
      Authorization: authHeader()
    }
  })
      .then(delay(600))
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToProjectModels)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error retrieving the projects. Please try again.'
        );
      });
  },
  post(project:Project){
    return fetch(`${baseUrl}/project`,{
      method:'post',
      body: JSON.stringify(project),
      headers:{
        'Content-Type': 'application/json',
        Authorization: authHeader()
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error creating the project. Please try again.'
        );
      });
  },
  put(project: Project) {
    return fetch(`${url}/${project._id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader()
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error updating the project. Please try again.'
        );
      });
  },
  find(id: string | undefined) {
    return fetch(`${url}/${id}`,{ headers: {
      Authorization: authHeader()
    }
  })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => convertToProjectModel(data.project));
  },
  delete(project: Project){
    return fetch(`${url}/${project._id}`, {
      method: 'DELETE',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader()
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .catch((error: TypeError) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error updating the project. Please try again.'
        );
      });
  },

};



export { projectAPI };