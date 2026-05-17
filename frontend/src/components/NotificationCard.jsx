import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const API_BASE_URL = "http://localhost:3000";
const NOTIFICATIONS_API_URL = `${"http://localhost:3000"}/api/notifications`;
const STATUS_STYLES = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  accepted: "bg-green-500/20 text-green-300 border-green-500/40",
  denied: "bg-red-500/20 text-red-300 border-red-500/40",
};
const SELLER_ACTIONS = ["pending", "accepted", "denied"];

function NotificationCard({ userId }) {
  const { accessToken } = useAuth();
  const [buyerNotifications, setBuyerNotifications] = useState([]);
  const [sellerNotifications, setSellerNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeUpdateId, setActiveUpdateId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadNotifications() {
      if (!userId) {
        if (isMounted) {
          setBuyerNotifications([]);
          setSellerNotifications([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `${NOTIFICATIONS_API_URL}?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Nem sikerult betolteni az ertesiteseket.");
        }

        const data = await response.json();
        if (isMounted) {
          setBuyerNotifications(
            Array.isArray(data?.buyerNotifications)
              ? data.buyerNotifications
              : [],
          );
          setSellerNotifications(
            Array.isArray(data?.sellerNotifications)
              ? data.sellerNotifications
              : [],
          );
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Hiba tortent az ertesitesek lekerese kozben.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadNotifications();

    return () => {
      isMounted = false;
    };
  }, [userId, accessToken]);

  const loadNotifications = async () => {
    if (!userId) return;
    const response = await fetch(`${NOTIFICATIONS_API_URL}?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Nem sikerult frissiteni az ertesiteseket.");
    }
    const data = await response.json();
    setBuyerNotifications(
      data?.buyerNotifications ? data.buyerNotifications : [],
    );
    setSellerNotifications(
      data?.sellerNotifications ? data.sellerNotifications : [],
    );
  };

  const handleStatusUpdate = async (notificationId, status) => {
    if (!userId) return;

    try {
      setActiveUpdateId(notificationId);
      setError("");

      const response = await fetch(
        `${NOTIFICATIONS_API_URL}/${notificationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: JSON.stringify({
            status,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("A status frissitese sikertelen.");
      }

      await loadNotifications();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Hiba tortent a status frissitese kozben.",
      );
    } finally {
      setActiveUpdateId(null);
    }
  };

  const getStatusClassName = (status) =>
    STATUS_STYLES[status] ||
    "bg-slate-700/40 text-slate-200 border-slate-600/60";

  const getStatusText = (status) => {
    if (status === "pending") return "pending";
    if (status === "accepted") return "accepted";
    if (status === "denied") return "denied";
    return status;
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-700/80 bg-slate-900/40 p-3 text-sm text-slate-300">
        Ertesitesek betoltese...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-700/60 bg-red-950/30 p-3 text-sm text-red-200">
        {error}
      </div>
    );
  }

  if (!buyerNotifications.length && !sellerNotifications.length) {
    return (
      <div className="rounded-xl border border-slate-700/80 bg-slate-900/40 p-3 text-sm text-slate-300">
        Jelenleg nincs uj ertesites.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <section className="min-h-0 rounded-xl border border-slate-700/80 bg-slate-900/40 p-3">
        <h4 className="mb-3 text-sm font-semibold text-white">
          Az altalam berelni kivant autok
        </h4>
        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {!buyerNotifications.length ? (
            <p className="rounded-lg bg-slate-800/70 p-3 text-sm text-slate-300">
              Nincs vasarloi ertesitesed.
            </p>
          ) : (
            buyerNotifications.map((notification) => (
              <article
                key={notification.id}
                className="rounded-lg border border-slate-700/80 bg-slate-800/70 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-sm font-semibold text-white">
                      {notification.car.make} {notification.car.model}
                    </h5>
                    <p className="text-xs text-slate-300">
                      Hirdeto: {notification.seller.name}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-1 text-xs font-medium ${getStatusClassName(notification.status)}`}
                  >
                    {getStatusText(notification.status)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-300">
                  Telefon: {notification.seller.phone || "-"}
                </p>
                <p className="text-xs text-slate-300">
                  Email: {notification.seller.email || "-"}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {notification.title || "Ertesites"}
                </p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="min-h-0 rounded-xl border border-slate-700/80 bg-slate-900/40 p-3">
        <h4 className="mb-3 text-sm font-semibold text-white">
          Az en hirdeteseimre erkezett kerelmek
        </h4>
        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {!sellerNotifications.length ? (
            <p className="rounded-lg bg-slate-800/70 p-3 text-sm text-slate-300">
              Nincs eladoi ertesitesed.
            </p>
          ) : (
            sellerNotifications.map((notification) => (
              <article
                key={notification.id}
                className="rounded-lg border border-slate-700/80 bg-slate-800/70 p-3"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-sm font-semibold text-white">
                      {notification.car.make} {notification.car.model}
                    </h5>
                    <p className="text-xs text-slate-300">
                      Berlo: {notification.buyer.name}
                    </p>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-1 text-xs font-medium ${getStatusClassName(notification.status)}`}
                  >
                    {getStatusText(notification.status)}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Eletkor: {notification.buyer.age ?? "-"}
                </p>
                <p className="text-xs text-slate-300">
                  Telefon: {notification.buyer.phone || "-"}
                </p>
                <p className="text-xs text-slate-300">
                  Email: {notification.buyer.email || "-"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SELLER_ACTIONS.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        handleStatusUpdate(notification.id, status)
                      }
                      disabled={activeUpdateId === notification.id}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${getStatusClassName(status)}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default NotificationCard;
