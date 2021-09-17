import axios from "axios";

const token =localStorage.getItem("token");

export default axios.create({
    baseURL:"https://expensetracker-be.herokuapp.com",
    //tokenı header olarak bütün isteklerde göndermemiz gerekiyor
    headers:{
        Authorization: token,
    }
    
})