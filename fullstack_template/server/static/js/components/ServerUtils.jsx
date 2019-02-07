import axios from 'axios';

export function buildSnippetBlock(snippetID) {
  let exerciseList = []
  let values = "";
  axios.all([
    axios.get('/api/exercises'),
    axios.get('/api/' + snippetID + '/values')]
  ).then(axios.spread((list, valuesResponse) => {
    const listData = list.data;
    listData.forEach(exercise => {
      exerciseList.push(exercise);
    })
    values = valuesResponse.data.values;
    const snippetBlock = {
      "list": exerciseList,
      "values": values
    };
    console.log(snippetBlock);
    return snippetBlock;
  }));
}

function apiCallExerciseList() {
  return axios.get('/api/exercises').then((response) => {return response.data}).catch(error => {return error});
}

export function getSnippetBodyById(snippetID) {
  return axios.get('/api/' + snippetID + '/body');
}


export function getSnippetValuesById(snippetID) {
  axios.get('/api/' + snippetID + '/values').then((res) => {
    return res.data.values;
  }).catch((error) => {
    console.error(error);
    return "";
  });
}
