export interface TourSchedule {
   tourScheduleId: string;
   name?: string | null;
   description?: string;
   startDate?: Date;
   endDate?: Date;
   tourId: string;
}

export interface Ticket {
   ticketId: string;
   price?: number;
   status?: number;
   note?: string | null;
   ticketType?: string;
}

export interface Booking {
   bookingId: string;
   status?: "PAID" | "PENDING" | "EXPIRED";
   totalPrice?: number;
   note?: string;
   userFullName?: string;
   userPhone?: string;
   userEmail?: string;
   userAddress?: string;
   tourSchedule: TourSchedule;
   tickets: Ticket[];
}

export interface BookingRequestTicket {
   price: number;
   status: number;
   ticketType: "ADULT" | "CHILD" | "BABY";
   birthDate?: string;
   fullName?: string;
   gender?: "male" | "female"
}

export interface BookingRequest {
   userFullName: string;
   userPhone: string;
   userEmail: string;
   userAddress: string;
   tourScheduleId: string;
   note?: string;
   tickets: BookingRequestTicket[];
}

