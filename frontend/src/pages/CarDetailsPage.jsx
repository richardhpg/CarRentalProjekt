import { useParams, useNavigate, data } from "react-router-dom";
import { cars, advertisements, users } from "../mock/data.js";
import Button from "../components/Button.jsx";
import Modal from "../components/Modal.jsx";
import { useEffect, useState } from "react";
import { CAR_PLACEHOLDER_IMAGE } from "../utils/constants.js";
import { useAuth } from "../components/AuthContext.jsx";

const API_BASE_URL = "http://localhost:3000";

function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestError, setRequestError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [car, setCar] = useState({});
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setCar(data);
        }
      } catch (err) {
        console.error("Cars fetch err: ", err);
      }
    };

    fetchCarData();
  }, [id, accessToken]);

  //const car = cars.find((c) => c.id === Number(id))
  const ad = advertisements.find((a) => a.car_id === Number(id));
  const owner = car ? users.find((u) => u.id === car.user_id) : undefined;

  if (!car) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-slate-50 px-4">
        <p className="mb-3 text-sm font-medium text-slate-800">Car not found</p>
        <Button onClick={() => navigate("/cars")}>Back to listings</Button>
      </div>
    );
  }

  const image = car.pictures?.[0];
  const src = imgError || !image ? CAR_PLACEHOLDER_IMAGE : image;

  const handleRentIntent = async () => {
    if (!user) {
      setOpenModal(true);
      return;
    }

    if (!ad?.id) {
      setRequestError("Ehhez az autohoz nem talalhato aktiv hirdetes.");
      setRequestMessage("");
      return;
    }

    try {
      setIsSubmitting(true);
      setRequestError("");
      setRequestMessage("");

      const response = await fetch(`${API_BASE_URL}/api/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({
          buyer_id: user.id,
          advertisement_id: ad.id,
          title: `${user.name} berlesi szandekot kuldott a(z) ${car.make} ${car.model} autora.`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "A berlesi szandek kuldese sikertelen.",
        );
      }

      setRequestMessage(
        "A berlesi szandek elkuldve. Varj az elado visszajelzesere.",
      );
    } catch (err) {
      setRequestError(
        err instanceof Error
          ? err.message
          : "Hiba tortent a berlesi szandek kuldese kozben.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-xs font-medium text-slate-500 hover:text-slate-800"
        >
          ← Back
        </button>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl bg-slate-900">
              <div className="relative h-64 w-full overflow-hidden bg-slate-800 sm:h-80">
                <img
                  src={src}
                  alt={`${car.make} ${car.model}`}
                  className="h-full w-full object-cover"
                  onError={() => setImgError(true)}
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
                  {ad?.location || "Budapest"}
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  €{car.daily_rate}/day
                </div>
              </div>
            </div>

            <div className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 md:grid-cols-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Year</p>
                <p className="text-sm font-semibold text-slate-900">
                  {car.prod_year}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Fuel</p>
                <p className="text-sm font-semibold text-slate-900">
                  {car.fuel_type}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Gearbox</p>
                <p className="text-sm font-semibold text-slate-900">
                  {car.gearbox_type}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Seats</p>
                <p className="text-sm font-semibold text-slate-900">
                  {car.seats_number}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Trunk space
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {car.trunk_space}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Air conditioning
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {car.air_con ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Max km / day
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {ad?.max_km_per_day} km
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Deposit</p>
                <p className="text-sm font-semibold text-slate-900">
                  €{car.deposit}
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-sm font-semibold text-slate-900">
                Description
              </h2>
              <p className="text-sm text-slate-600">
                {ad?.description ||
                  "Comfortable and well-equipped car, ideal for both city driving and longer trips."}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <h2 className="mb-2 text-sm font-semibold text-slate-900">
                Trip details
              </h2>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Price per day</span>
                  <span className="font-semibold text-slate-900">
                    €{car.daily_rate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated deposit</span>
                  <span className="font-semibold text-slate-900">
                    €{car.deposit}
                  </span>
                </div>
              </div>
              <Button
                className="mt-4 w-full"
                onClick={handleRentIntent}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Kuldes..." : "Rent this car"}
              </Button>
              {requestMessage ? (
                <p className="mt-2 text-xs text-green-600">{requestMessage}</p>
              ) : null}
              {requestError ? (
                <p className="mt-2 text-xs text-red-600">{requestError}</p>
              ) : null}
            </div>

            {owner && (
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <h2 className="mb-3 text-sm font-semibold text-slate-900">
                  Owner
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    {owner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-slate-900">
                      {owner.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Age {owner.age} • Verified host
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <p>{owner.contact_email}</p>
                  <p>{owner.contact_phoneNumber}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={openModal}
        title="Almost there"
        onClose={() => setOpenModal(false)}
        actions={
          <>
            <button
              onClick={() => setOpenModal(false)}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              Close
            </button>
            <Button
              onClick={() => {
                setOpenModal(false);
                navigate("/login");
              }}
            >
              Continue to login
            </Button>
          </>
        }
      >
        <p>
          To complete your booking, please log in or create an account. This
          demo uses mock data only, but in a real product this step would
          confirm your trip details and payment.
        </p>
      </Modal>
    </div>
  );
}

export default CarDetailsPage;
