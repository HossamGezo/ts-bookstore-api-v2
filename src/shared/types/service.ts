export interface ServiceResult<T = any> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
}
