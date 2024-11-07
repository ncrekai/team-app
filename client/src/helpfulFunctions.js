export const getDayIn = (current) => {
   const date = new Date(current);
   let year = date.getFullYear();
   let month = date.getMonth() + 1
   let formattedM = month < 10 ? `0${month}` : month;
   let day = date.getDate();
   let formattedD = day < 10 ? `0${day}` : day;
   return `${year}-${formattedM}-${formattedD}`;

};

export const getDayOut = (val) => {
   const dateArr = val.split('-')
   let year = dateArr[0]
   let month = dateArr[1]
   let day = dateArr[2]
   return `${month}/${day}/${year}`;
};