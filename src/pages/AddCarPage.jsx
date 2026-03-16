import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'

function AddCarPage() {
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
            <Input label="Make" placeholder="Tesla" />
            <Input label="Model" placeholder="Model 3" />
            <Input label="Year" type="number" placeholder="2022" />
            <Input label="Fuel type" placeholder="Electric" />
            <Input label="Gearbox" placeholder="Automatic" />
            <Input label="Seats" type="number" placeholder="5" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Input label="Price per day (€)" type="number" placeholder="95" />
            <Input label="Deposit (€)" type="number" placeholder="500" />
            <Input label="License plate" placeholder="EVR-303" />
          </div>

          <Input
            label="Pictures"
            placeholder="Paste image URLs separated by commas"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <Button type="submit">Preview listing</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCarPage

