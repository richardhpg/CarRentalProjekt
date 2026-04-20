import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'
import { useState } from 'react'

function AddCarPage() {

  const [airchecked, setAirChecked] = useState(false)
  const [availableChacked, setAvailableChecked] = useState(false)

  const [formTemplate, setFormTemplate] = useState({
    user_id: -1,
    make: "",/**/
    model: "",/**/
    prod_year: 0, /**/
    available: 0, /**/
    driving_licence: "",/**/
    pictures: "",/**/
    trunk_space: 0, 
    daily_rate: 0, /**/
    deposit: 0,/**/
    licence_plate: "",/**/
    fuel_type: "",/**/
    doors_number: 0, /**/
    air_con: 0,/**/
    seats_number: 0,/**/
    gearbox_type: "",/**/

  });

  const writeData = (e) => {
    setFormTemplate((prev) => ({
      ...prev, [e.target.id] : e.target.value
    }))
  }

  const submit = async (e) => {
     e.preventDefault();
     formTemplate.air_con = airchecked ? 1 : 0 
     formTemplate.available = availableChacked ? 1 : 0 
    const request = await fetch("http://localhost:3000/api/cars/", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(formTemplate)
    })
  }


  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
            List a new car
          </h1>
          <p className="text-sm text-slate-500">
            Fill in the details below to create a new listing. This is a
            frontend-only demo – data will not be saved.
          </p>
        </header>

        <form className="space-y-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Márka</span>
              <input
                id="make"
                type="text"
                placeholder="Tesla"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Model</span>
              <input
                id="model"
                type="text"
                placeholder="Model 3"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Production year</span>
              <input
                id="prod_year"
                type="text"
                placeholder="2022"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Fuel type</span>
              <input
                id="fuel_type"
                type="text"
                placeholder="Electirc"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Gearbox type</span>
              <input
                id="gearbox_type"
                type="text"
                placeholder="Automatic"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Number of seats</span>
              <input
                id="seats_number"
                type="text"
                placeholder="5"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Trunk space</span>
              <input
                id="trunk_space"
                type="number"
                placeholder="5"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Doors number</span>
              <input
                id="doors_number"
                type="text"
                placeholder="4"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Driveing Licence (category)</span>
              <input
                id="driving_licence"
                type="text"
                placeholder="B"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>

            {/* Checkboxok  */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                onClick={() => {setAirChecked(prev => !prev)}}
                id="air_con"
                className="h-5 w-5 rounded-full border-slate-200 bg-white text-blue-500 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <span className="font-medium text-slate-700">Air condition</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                onClick={() => {setAvailableChecked(prev => !prev)}}
                id="available"
                className="h-5 w-5 rounded-full border-slate-200 bg-white text-blue-500 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <span className="font-medium text-slate-700">Elérhető a közzététel pillanatától</span>
            </label>
          </div>
          {/* Árazás/anyagi dolgok */}
          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Price per day (€)</span>
              <input
                id="daily_rate"
                type="number"
                placeholder="95"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Deposit (€)</span>
              <input
                id="deposit"
                type="number"
                placeholder="500"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">License plate</span>
              <input
                id="licence_plate"
                type="text"
                placeholder="AO IR 526"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
          </div>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Pictures</span>
            <input
              id="pictures"
              type="text"
              placeholder="https://kep.img"
              className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
            />
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <Button onClick={submit} type="submit">Preview listing</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCarPage

