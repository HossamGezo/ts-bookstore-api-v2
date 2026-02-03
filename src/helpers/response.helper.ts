/**
 * @desc Generate a standardized 404 Not Found response
 */
export const notFoundResponse = (target: string) => {
  const formattedTarget =
    target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();

  return {
    success: false,
    statusCode: 404,
    message: `${formattedTarget} not found`,
  };
};

/**
 * @desc For Other Failure Responses
 */
interface failureResponseParams {
  statusCode?: number;
  message: string;
}
export const failureResponse = ({
  statusCode = 400,
  message,
}: failureResponseParams) => {
  return {
    success: false,
    statusCode,
    message,
  };
};

/**
 * @desc Generate a standardized success response
 */
export const successResponse = <T>(data: T) => {
  return {
    success: true,
    data,
  };
};
