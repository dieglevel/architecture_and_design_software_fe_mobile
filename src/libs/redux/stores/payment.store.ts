import { TourScheduleResponses } from "@/types/implement";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
   bookingId: string | null;
   tourScheduleId: string | null;
   adultCount: number ;
   childCount: number ;
   babyCount: number;
   totalPrice: number | null;
   information: {
      userFullName: string | null;
      userPhone: string | null;
      userEmail: string | null;
      userAddress: string | null;
   }
   data: TourScheduleResponses | null;
}

const initialState: PaymentState = {
   data: null,
   bookingId: null,
   tourScheduleId: null,
   adultCount: 1,
   childCount: 0,
   babyCount: 0,
   totalPrice: null,
   information: {
      userFullName: null,
      userPhone: null,
      userEmail: null,
      userAddress: null,
   },
};

const paymentSlice = createSlice({
   name: "payment",
   initialState,
   reducers: {
      setPage1: (state, action: PayloadAction<{
         data?: TourScheduleResponses | null;
         tourScheduleId?: string | null;
         adultCount?: number | null;
         childCount?: number | null;
         babyCount?: number | null;
         totalPrice?: number | null;
      }>) => {
         action.payload.data && (state.data = action.payload.data);
         action.payload.tourScheduleId && (state.tourScheduleId = action.payload.tourScheduleId);
         action.payload.adultCount && (state.adultCount = action.payload.adultCount);
         action.payload.childCount && (state.childCount = action.payload.childCount);
         action.payload.babyCount && (state.babyCount = action.payload.babyCount);
         action.payload.totalPrice && (state.totalPrice = action.payload.totalPrice);
      },
      setPage2: (state, action: PayloadAction<{
         userFullName?: string | null;
         userPhone?: string | null;
         userEmail?: string | null;
         userAddress?: string | null;
      }>) => {
         action.payload.userFullName && (state.information.userFullName = action.payload.userFullName);
         action.payload.userPhone && (state.information.userPhone = action.payload.userPhone);
         action.payload.userEmail && (state.information.userEmail = action.payload.userEmail);
         action.payload.userAddress && (state.information.userAddress = action.payload.userAddress);
      },
      reset: () => initialState,
   },
});

export const { setPage1, setPage2, reset } = paymentSlice.actions;

const paymentReducer = paymentSlice.reducer;
export default paymentReducer;
