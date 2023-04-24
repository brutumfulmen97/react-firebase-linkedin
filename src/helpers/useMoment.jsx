import moment from "moment/moment";

export const getCurrentTimeStamp = (format) => {
    return moment().format(format);
};
