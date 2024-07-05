import api_root from "../../axios";

export const predictDiabetesRequest = async (values: {
  age: number;
  gender: number;
  polyuria: number;
  polydipsia: number;
  suddenWeightLoss: number;
  weakness: number;
  polyphagia: number;
  genitalThrush: number;
  visualBlurring: number;
  itching: number;
  irritability: number;
  delayedHealing: number;
  partialParesis: number;
  muscleStiffness: number;
  alopecia: number;
  obesity: number;
}) => {
  try {
    const promise = await api_root.api.post("api/diabetes/predict", values);
    // console.log(promise);

    if (promise.status !== 200) {
      throw Error(promise.statusText);
    }
    const response = await promise.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};
