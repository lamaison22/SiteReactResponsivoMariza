import AXIOS from "axios"
import dayjs from "dayjs";
import { toast } from "react-toastify";
import React from "react";
export const api = AXIOS.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/property/allprops", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Algo deu errado");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/property/${id}`, {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Algo deu errado");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Algo deu errado");
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Algo deu errado tente novamente");
    throw error;
  }
};
export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/cancelBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Algo deu errado");
    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getAllFav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFav`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res1", res);

    return res.data["favoriteResidenciesId"];
  } catch (error) {
    toast.error("Algo deu errado ao obter favoritos");
    throw error;
  }
};

export const getAllBookings = async (email, token) => {
  try {
    if (!token) return;
    const res = await api.post(
      `/user/allBookings`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("res", res);
    return res.data["bookedVisits"];
  } catch (error) {
    toast.error("Algo deu errado ao obter agendamentos");
    throw error;
  }
};

export const createResidency = async (data, token) => {
  try {
    const res = await api.post(
      `property/create`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
  } catch (error) {
    toast.error("Algo deu errado");
    throw error;
  }
};
export const updateResidency = async (data, token) => {
  try {
    const res = await api.post(
      `property/update`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
  } catch (error) {
    console.log("caiu no erro update");
    toast.error("Algo deu errado");
    throw error;
  }
};
export const deleteResidency = async (data, token) => {


  try {
    await api.post(
      `property/delete`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("caiu no erro delete");
    toast.error("Algo deu errado");
    throw error;
  }
};
