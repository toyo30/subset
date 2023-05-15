import { AxiosInstance } from "axios";

import { baseApi } from "./base-api";
// import { BaseResponse } from "./base-response";

enum FcmApiUrl {
  SendMessage = "/send-message",
}

class FcmApi {
  private _api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this._api = api;
  }

  async sendMessage(payload: {
    message: string;
    tokens: string[];
  }): Promise<any> {
    return await this._api.post(FcmApiUrl.SendMessage, payload, {
      withCredentials: true,
    });
  }
}

export const fcmApi = new FcmApi(baseApi);
