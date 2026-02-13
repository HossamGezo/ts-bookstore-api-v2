// --- Types
interface failureResponseParams {
  statusCode?: number;
  message: string;
}

export interface FailureResponse {
  success: false;
  statusCode: number;
  message: string;
}

/**
 * @desc For Other Failure Responses
 */
export const failureResponse = ({
  statusCode = 400,
  message,
}: failureResponseParams): FailureResponse => {
  return {
    success: false,
    statusCode,
    message,
  };
};

/**
 * @desc Generate a standardized 404 Not Found response
 */
export const notFoundResponse = (target: string): FailureResponse => {
  const formattedTarget =
    target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();

  return failureResponse({
    statusCode: 404,
    message: `${formattedTarget} not found`,
  });
};

/**
 * @desc Generate a standardized success response
 */
export const successResponse = <T>(data: T) => {
  return {
    success: true as const,
    data,
  };
};
