import axios from 'axios'
const baseURL=`https://api.covid19india.org`;

export const timeSeriesData = () =>{
    return axios.get(`${baseURL}/data.json`);
}

export const stateDistrictWiseData = () => {
    return axios.get(`${baseURL}/state_district_wise.json`)
}