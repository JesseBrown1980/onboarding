export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.error || 'Server Error';
  } else if (error.request) {
    return 'Network Error - Please check your internet connection';
  }
  return 'An unexpected error occurred';
};