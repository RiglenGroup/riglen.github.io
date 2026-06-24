function formatJsonDateSafe(dateStr) {
    if (typeof dateStr !== 'string' || dateStr.length < 10) {
      return '';
    }

    var year  = dateStr.slice(0, 4);
    var month = dateStr.slice(5, 7);
    var day   = dateStr.slice(8, 10);
    var months = {
      '01':'JAN','02':'FEB','03':'MAR','04':'APR','05':'MAY','06':'JUN',
      '07':'JUL','08':'AUG','09':'SEP','10':'OCT','11':'NOV','12':'DEC'
    };

    if (!months[month]) {
      return '';
    }
    return day + ' ' + months[month] + ' ' + year;
};