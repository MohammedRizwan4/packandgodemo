import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const bookingService = createApi({
    reducerPath: "booking",
    tagTypes: "bookings",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:7800/api",
    }),
    endpoints: (builder) => {
        return {
            packageBooking: builder.mutation({
                query: (data) => {
                    return {
                        url: "package-booking",
                        method: "POST",
                        body: data
                    }
                },
                invalidatesTags: ['bookings']
            }),
            fetchUserBooking: builder.query({
                query: (id) => {
                    return {
                        url: `fetch-user-booking/${id}`,
                        method: "GET",
                    }
                },
                providesTags: ['bookings']
            }),
            checkOutSessionPayment: builder.mutation({
                query: (data) => {
                    return {
                        url: 'create-checkout-session',
                        method: "POST",
                        body: data
                    }
                }
            }),
            verifyPayment: builder.query({
                query: (id) => {
                    return {
                        url: `verify-payment/${id}`,
                        method: "GET",
                    }
                }
            }),
        }
    }
})

export const { useVerifyPaymentQuery, useFetchUserBookingQuery, usePackageBookingMutation, useCheckOutSessionPaymentMutation } = bookingService;

export default bookingService;

