import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function AddCarPage() {
  const [airchecked, setAirChecked] = useState(false);
  const [availableChacked, setAvailableChecked] = useState(false);
  const { user, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/cars", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [accessToken]);

  const [formTemplate, setFormTemplate] = useState({
    user_id: user ? user.id : -1,
    make: "" /**/,
    model: "" /**/,
    prod_year: 0 /**/,
    driving_licence: "" /**/,
    pictures: "" /**/,
    available: true,
    trunk_space: 0,
    daily_rate: 0 /**/,
    deposit: 0 /**/,
    licence_plate: "" /**/,
    fuel_type: "" /**/,
    doors_number: 0 /**/,
    air_con: false /**/,
    seats_number: 0 /**/,
    gearbox_type: "" /**/,
  });

  const writeData = (e) => {
    setFormTemplate((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const submit = async (e) => {
    if (!user) {
      navigate("/login");
      return;
    }

    console.log(formTemplate);
    e.preventDefault();
    if (!formTemplate.pictures) {
      formTemplate.pictures = "car-placeholder.svg";
    }
    formTemplate.user_id = user.id;
    formTemplate.air_con = airchecked ? true : false;
    formTemplate.available = availableChacked ? true : false;
    formTemplate.prod_year = parseInt(formTemplate.prod_year);
    formTemplate.trunk_space = parseInt(formTemplate.trunk_space);
    formTemplate.daily_rate = parseFloat(formTemplate.daily_rate);
    formTemplate.deposit = parseFloat(formTemplate.deposit);
    formTemplate.doors_number = parseInt(formTemplate.doors_number);
    formTemplate.seats_number = parseInt(formTemplate.seats_number);

    const request = await fetch("http://localhost:3000/api/cars/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(formTemplate),
    });

    const response = await request.json();
    console.log(response.message);
  };

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
                onChange={writeData}
                id="make"
                type="text"
                placeholder="Tesla"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Model</span>
              <input
                onChange={writeData}
                id="model"
                type="text"
                placeholder="Model 3"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">
                Production year
              </span>
              <input
                onChange={writeData}
                id="prod_year"
                type="text"
                placeholder="2022"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Fuel type</span>
              <input
                onChange={writeData}
                id="fuel_type"
                type="text"
                placeholder="Electirc"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Gearbox type</span>
              <input
                onChange={writeData}
                id="gearbox_type"
                type="text"
                placeholder="Automatic"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">
                Number of seats
              </span>
              <input
                onChange={writeData}
                id="seats_number"
                type="text"
                placeholder="5"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Trunk space</span>
              <input
                onChange={writeData}
                id="trunk_space"
                type="number"
                placeholder="5"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Doors number</span>
              <input
                onChange={writeData}
                id="doors_number"
                type="text"
                placeholder="4"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">
                Driveing Licence (category)
              </span>
              <input
                onChange={writeData}
                id="driving_licence"
                type="text"
                placeholder="B"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>

            {/* Checkboxok  */}
            <label className="flex items-center gap-2 text-sm">
              <input
                onChange={writeData}
                type="checkbox"
                onClick={() => {
                  setAirChecked((prev) => !prev);
                }}
                id="air_con"
                className="h-5 w-5 rounded-full border-slate-200 bg-white text-blue-500 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <span className="font-medium text-slate-700">Air condition</span>
            </label>
            {/* <label className="flex items-center gap-2 text-sm">
              <input
                onChange={writeData}
                type="checkbox"
                onClick={() => {setAvailableChecked(prev => !prev)}}
                id="available"
                className="h-5 w-5 rounded-full border-slate-200 bg-white text-blue-500 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <span className="font-medium text-slate-700">Elérhető a közzététel pillanatától</span>
            </label> */}
          </div>
          {/* Árazás/anyagi dolgok */}
          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">
                Price per day (€)
              </span>
              <input
                onChange={writeData}
                id="daily_rate"
                type="number"
                placeholder="95"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">Deposit (€)</span>
              <input
                onChange={writeData}
                id="deposit"
                type="number"
                placeholder="500"
                className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-slate-700">License plate</span>
              <input
                onChange={writeData}
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
              onChange={writeData}
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
            <Button onClick={submit} type="submit">
              Preview listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCarPage;
