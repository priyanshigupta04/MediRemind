import { Pill, CheckCircle, AlertCircle } from "lucide-react"

function MedicineStats({ medicines }) {
  const totalMedicines = medicines.length

  const getTakenToday = () => {
    const today = new Date().setHours(0, 0, 0, 0)
    return medicines.filter((med) => {
      if (!med.lastTaken) return false
      const lastTakenDate = new Date(med.lastTaken).setHours(0, 0, 0, 0)
      return lastTakenDate === today
    }).length
  }

  const takenToday = getTakenToday()
  const pendingToday = totalMedicines - takenToday

  return (
    <div className="medicine-stats">
      <div className="stat-item">
        <Pill size={18} />
        <span>Total: {totalMedicines}</span>
      </div>
      <div className="stat-item">
        <CheckCircle size={18} />
        <span>Taken: {takenToday}</span>
      </div>
      <div className="stat-item">
        <AlertCircle size={18} />
        <span>Pending: {pendingToday}</span>
      </div>
    </div>
  )
}

export default MedicineStats

