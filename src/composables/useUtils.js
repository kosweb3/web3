import moment from "moment";

export const useUtils = () => {
  const formatDate = (timelinedate) => moment(timelinedate).format("DD.MM.YY");

  return {
    formatDate,
  };
};
