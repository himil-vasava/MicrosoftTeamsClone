import axios from "axios";

const API = axios.create({
  baseURL: "https://calm-savannah-53647.herokuapp.com/",
});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
