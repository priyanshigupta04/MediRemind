"use client"
import { Clock, Calendar, Edit, Trash2, Check } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

function MedicineCard({ medicine, onDelete, onEdit, onMarkTaken }) {
  const { id, name, dosage, frequency, time, lastTaken } = medicine

  const getStatusClass = () => {
    if (!lastTaken) return "status-due"

    const lastTakenDate = new Date(lastTaken)
    const now = new Date()
    const hoursSinceLastTaken = (now - lastTakenDate) / (1000 * 60 * 60)

    // Simple logic - if taken in last 24 hours, it's taken
    // This should be improved based on frequency in a real app
    return hoursSinceLastTaken < 24 ? "status-taken" : "status-due"
  }

  const getLastTakenText = () => {
    if (!lastTaken) return "Not taken yet"
    return `Last taken ${formatDistanceToNow(new Date(lastTaken))} ago`
  }

  return (
    <div className={`medicine-card ${getStatusClass()}`}>
      <div className="medicine-info">
        <h3>{name}</h3>
        <p className="dosage">{dosage}</p>

        <div className="medicine-details">
          <div className="detail">
            <Clock size={16} />
            <span>{time}</span>
          </div>
          <div className="detail">
            <Calendar size={16} />
            <span>{frequency}</span>
          </div>
        </div>

        <p className="last-taken">{getLastTakenText()}</p>
      </div>

      <div className="medicine-actions">
        <button className="action-button take-button" onClick={() => onMarkTaken(id)} title="Mark as taken">
          <Check size={18} />
        </button>
        <button className="action-button edit-button" onClick={() => onEdit(medicine)} title="Edit medicine">
          <Edit size={18} />
        </button>
        <button className="action-button delete-button" onClick={() => onDelete(id)} title="Delete medicine">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

export default MedicineCard

