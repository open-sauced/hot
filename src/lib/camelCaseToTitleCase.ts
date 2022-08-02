const camelCaseToTitleCase = (string: string) => {
  const result = string.replace(/([A-Z])/g, " $1");

  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default camelCaseToTitleCase;
