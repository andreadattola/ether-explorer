export const getRightDate = (timestamp) => {
    if (!timestamp) return
    const currentDate = new Date(timestamp)
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();
    return `${currentDayOfMonth}-${currentMonth + 1}-${currentYear}`



}