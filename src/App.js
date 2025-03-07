"use client"

import { useState, useEffect } from "react"
import { Plus, X } from "lucide-react"
import "./App.css"
import Header from "./components/Header"
import MedicineList from "./components/MedicineList"
import AddMedicineForm from "./components/AddMedicineForm"
import MedicineStats from "./components/MedicineStats"
import { getMedicines, saveMedicines } from "./utils/localStorage"

function App() {
  const [medicines, setMedicines] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState(null)

  useEffect(() => {
    const savedMedicines = getMedicines()
    if (savedMedicines) {
      setMedicines(savedMedicines)
    }
  }, [])

  useEffect(() => {
    saveMedicines(medicines)
  }, [medicines])

  const addMedicine = (medicine) => {
    const newMedicine = {
      ...medicine,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      history: [],
    }
    setMedicines([...medicines, newMedicine])
    setShowAddForm(false)
  }

  const updateMedicine = (updatedMedicine) => {
    setMedicines(medicines.map((med) => (med.id === updatedMedicine.id ? updatedMedicine : med)))
    setEditingMedicine(null)
    setShowAddForm(false)
  }

  const deleteMedicine = (id) => {
    setMedicines(medicines.filter((medicine) => medicine.id !== id))
  }

  const markAsTaken = (id) => {
    setMedicines(
      medicines.map((medicine) => {
        if (medicine.id === id) {
          const takenAt = new Date().toISOString()
          return {
            ...medicine,
            history: [...medicine.history, takenAt],
            lastTaken: takenAt,
          }
        }
        return medicine
      }),
    )
  }

  const startEditing = (medicine) => {
    setEditingMedicine(medicine)
    setShowAddForm(true)
  }

  return (
    <div className="app-container">
      <Header />

      <div className="main-content">
        <div className="top-actions">
          <MedicineStats medicines={medicines} />
          <button
            className="add-button"
            onClick={() => {
              setEditingMedicine(null)
              setShowAddForm(!showAddForm)
            }}
          >
            {showAddForm ? <X /> : <Plus />}
            {showAddForm ? "Cancel" : "Add Medicine"}
          </button>
        </div>

        {showAddForm && (
          <AddMedicineForm
            addMedicine={addMedicine}
            editingMedicine={editingMedicine}
            updateMedicine={updateMedicine}
          />
        )}

        <MedicineList medicines={medicines} onDelete={deleteMedicine} onEdit={startEditing} onMarkTaken={markAsTaken} />
      </div>
    </div>
  )
}

export default App

