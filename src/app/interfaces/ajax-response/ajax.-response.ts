export interface AjaxResponse<T> {
    statusCode?: number;
    message?: string;
    data?: T | any;
}