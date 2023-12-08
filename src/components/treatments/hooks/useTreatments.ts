import { useQuery, useQueryClient } from "@tanstack/react-query";

// import axios, { AxiosRequestConfig } from "axios";
// import { error } from "console";
// import { response } from "msw";
import type { Treatment } from "../../../../shared/types";
import { axiosInstance } from "../../../apiCallInstance";
// import { baseUrl } from "../../../apiCallInstance/constants";
import { queryKeys } from "../../../react-query/constants";

// const config: AxiosRequestConfig = { baseURL: baseUrl };
// const axiosInstance = axios.create(config);

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  // const { data } = await axios.get(`http://localhost:3030/treatments`);
  const { data } = await axiosInstance.get("/treatments");
  return data;
  // axios
  //   .get(`http://localhost:3030/treatments`)
  //   .then((response) => {
  //     console.log("responseresponse ", response);
  //     // setOrderNumber(response.data.orderNumber);
  //   })
  //   .catch(() => {
  //     // TODO: handle error
  //   });
}

export function useTreatments(): Treatment[] {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  });
  return data;
  // const data = getTreatments();
  // console.log("datadata ", data);
  // return data as unknown as Treatment[];
  // getTreatments()
  //   .then((response) => {
  //     console.log("responseresponseresponse ", response);
  //     // return response;
  //   })
  //   .catch((error) => {
  //     // return [];
  //   });
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  });
}
