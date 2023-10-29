import moment from 'moment-timezone';

export const convertToTimeZone = (dateString, timeZone = 'America/La_Paz') => {
    if (!dateString) {
        return '';
    }
    return moment(dateString).tz(timeZone).format('DD/MM/YYYY HH:mm:ss');
};