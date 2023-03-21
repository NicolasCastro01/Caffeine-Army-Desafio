import axios from "axios";
import { API_URL } from "../constants";

export const Axios = axios.create({ baseURL: API_URL });
