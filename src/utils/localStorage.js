export const getMedicines = () => {
    const medicines = localStorage.getItem("medicines")
    return medicines ? JSON.parse(medicines) : []
  }
  
  export const saveMedicines = (medicines) => {
    localStorage.setItem("medicines", JSON.stringify(medicines))
  }
  
  