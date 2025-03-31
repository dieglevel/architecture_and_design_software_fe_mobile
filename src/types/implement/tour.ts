export interface Tour {
	tourId: string;
	name: string;
	description: string;
	price: number;
	thumbnail: string;
	duration: string;
	tourDestinationResponses: any[];
	tourImageResponses: any[];
	active: boolean;
}
