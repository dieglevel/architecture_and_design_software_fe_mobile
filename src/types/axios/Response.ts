export type AxiosResponse<T> = {
	data: T | null;
	statusCode: number;
	message: string;
};
