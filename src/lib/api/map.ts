import api_root from "../../axios";

export const getAllPharmaciesByLocationRequest = async (
  latitude: number,
  longitude: number
) => {
  try {
    const promise = await api_root.api.get(
      `/api/pharmacies/nearest?latitude=${latitude}&longitude=${longitude}`
    );
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

export const getAllRestaurantsByLocationRequest = async (
  latitude: number,
  longitude: number
) => {
  try {
    const promise = await api_root.api.get(
      `/api/restaurants/nearest?latitude=${latitude}&longitude=${longitude}`
    );
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

export const getAllClinicsByLocationRequest = async (
  latitude: number,
  longitude: number
) => {
  try {
    const promise = await api_root.api.get(
      `/api/clinics/nearest?latitude=${latitude}&longitude=${longitude}`
    );
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
