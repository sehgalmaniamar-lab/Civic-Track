import API from "./api";

export const getComplaints = async () => {
  const response = await API.get(
    "/complaints/"
  );

  return response.data;
};

export const addComplaint = async (
  complaintData
) => {
  const response = await API.post(
    "/complaints/",
    complaintData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteComplaint = async (
  id
) => {
  await API.delete(
    `/complaints/${id}/`
  );
};

export const updateComplaintStatus =
  async (id, status) => {
    const response = await API.patch(
      `/complaints/${id}/`,
      {
        status,
      }
    );

    return response.data;
  };

  export const signupUser = async (
  userData
) => {
  const response = await API.post(
    "/auth/signup/",
    userData
  );

  return response.data;
};

export const loginUser = async (
  userData
) => {
  const response = await API.post(
    "/auth/login/",
    userData
  );

  return response.data;
};