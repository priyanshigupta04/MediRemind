import MedicineCard from "./MedicineCard"

function MedicineList({ medicines, onDelete, onEdit, onMarkTaken }) {
  if (medicines.length === 0) {
    return (
      <div className="empty-state">
        <h3>No medicines added yet</h3>
        <p>Add your first medicine using the button above</p>
      </div>
    )
  }

  return (
    <div className="medicine-list">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine.id}
          medicine={medicine}
          onDelete={onDelete}
          onEdit={onEdit}
          onMarkTaken={onMarkTaken}
        />
      ))}
    </div>
  )
}

export default MedicineList

