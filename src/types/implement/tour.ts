export interface Tour {
	tourId: string;
	name?: string;
	description?: string;
	price?: number;
	thumbnail?: string;
	duration?: string;
	tourDestinationResponses?: TourDestinationResponse[];
	tourImageResponses?: TourImageResponse[];
	active?: boolean;
	tourScheduleResponses?: TourScheduleResponses[];
}

export interface TourDestinationResponse {
	name?: string
	description?: string
	image?: string
	active?: boolean
}

export interface TourImageResponse {
	tourImageId?: string
	tourId?: string
	imageUrl?: string
	description?: string
	orderIndex?: number
	active?: boolean
}
export interface TourScheduleResponses {
	tourScheduleId: string;
	name?: string
	description?: string;
	startDate?: Date;
	endDate?: Date;
	adultPrice?: number;
	childPrice?: number;
	babyPrice?: number;
	slot?: number;
	tourId: string;
}