import baseApi from "../../baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register a user
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    // Login a user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["users"],
    }),

    // Fetch authenticated user
    getAuthenticatedUser: builder.query({
      query: (token) => ({
        url: "/users/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["users"],
    }),

    // get all users
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),

    getUserById: builder.query({
      query: (id) => `/users/single-user/${id}`,
      providesTags: ["users"],
    }),

    // Update user status (e.g., approve, reject, ban)
    updateUserStatus: builder.mutation({
      query: ({ id, status, email, token }) => ({
        url: `/users/updateuserstatus/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { status, email },
      }),
      invalidatesTags: ["users"],
    }),

    // Update user profile image
    updateUserProfileImage: builder.mutation({
      query: ({ id, profileImage, token }) => ({
        url: `/users/update-user-image/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { profileImage },
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useLoginUserMutation,
  useLazyGetAuthenticatedUserQuery,
  useGetUsersQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserStatusMutation,
  useUpdateUserProfileImageMutation,
} = usersApi;
