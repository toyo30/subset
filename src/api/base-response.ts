// import _ from "lodash";
// import { ErrorMessage } from "../types/error-message";
// import { convertArrayToObject } from "../utils/convert-array-to-object";

// export interface BaseResponse<T> {
//   ok: boolean;
//   data: T;
//   fieldErrors: { [key: string]: string };
// }

// export const getBaseResponse = (data: any, status: number): any => {
//   const ok = SUCCESS_STATUS_CODE.includes(status);

//   const fieldErrors = convertArrayToObject(data.fieldErrors || []);

//   if (!ok) {
//     console.log(data);
//     if (_.isEqual(fieldErrors, {})) {
//       const defaultErrorKey = data.globalError.errorCode;
//       const defaultErrorMessage = data.globalError.message;
//       if (defaultErrorMessage === "java.lang.NullPointerException") {
//         console.log("defaultErrorMessage", defaultErrorMessage);
//         return;
//       }
//       const errorMessageKeyList = Object.keys(ErrorMessage);
//       if (errorMessageKeyList.includes(defaultErrorKey)) {
//         toast.error(ErrorMessage[defaultErrorKey]);
//         throw Error(defaultErrorKey);
//       }
//       toast.error(`[${defaultErrorKey}] ${defaultErrorMessage}`);
//       throw Error(defaultErrorKey);
//     }
//   }

//   return {
//     ok,
//     data,
//     fieldErrors,
//   };
// };

export {};
