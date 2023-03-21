import { Shopkeeper } from "../models/shopkeeper.model";
import { Axios } from "./infra/axios/api";

export class ShopkeeperController {
  async authenticate({ email, password }) {
    const { data } = await Axios.post("/login", {
      email,
      password,
    });
    const hasError = data.msg;

    if (hasError) {
      return false;
    }

    const { shopkeeper, access_token } = data;
    const { id, name, phone } = shopkeeper;

    return new Shopkeeper(id, name, shopkeeper.email, phone, access_token);
  }

  async register({ name, email, phone, password }) {
    const { data } = await Axios.post("/register", {
      name,
      email,
      phone,
      password,
    });
    return data;
  }

  async getStore(cnpj, access_token) {
    const { data } = await Axios.get(`/api/v1/shopkeeper/store?cnpj=${cnpj}`, {
      headers: { Authorization: `bearer ${access_token}` },
    });
    return data;
  }
}
