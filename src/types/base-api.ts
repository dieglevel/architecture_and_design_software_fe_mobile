export interface BaseResponse<T> {
	data?: T | null;
	statusCode: number;
	success: boolean;
	message: string;
}
