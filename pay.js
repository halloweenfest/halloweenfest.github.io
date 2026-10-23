/* Holly Haunt unlock: a payment only counts after the server confirms it with Razorpay.
   The URL parameter and localStorage only hold the payment id to check; they never unlock anything on their own. */
(function () {
  const VERIFY_URL = "https://emmas-kitchen-ce0.pages.dev/api/hollyhaunt/verify";
  const ID_KEY = "hollyHaunt.paymentId";
  const listeners = [];
  const state = { paid: false, checking: false, error: "" };
  let pending = null;

  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
    } catch (e) { return null; }
  }
  function track(name, props) { if (window.posthog) posthog.capture(name, props || {}); }
  function emit() { listeners.forEach((fn) => { try { fn(state); } catch (e) {} }); }

  // Drop the old unverified flag so it can no longer unlock anything.
  store("hollyHaunt.paid", null);

  const q = new URLSearchParams(location.search);
  const returned = q.get("razorpay_payment_id");
  if (returned && /^pay_[A-Za-z0-9]+$/.test(returned)) {
    store(ID_KEY, returned);
    track("payment_returned", { has_payment_id: true, source: /fly|emma|broom/.test(location.pathname) ? "emma" : "rooms" });
  }
  if (q.has("razorpay_payment_id")) history.replaceState({}, "", location.pathname + location.hash);

  function check() {
    const id = store(ID_KEY);
    if (!id) return Promise.resolve(state);
    if (pending) return pending;
    state.checking = true; state.error = ""; emit();
    pending = fetch(VERIFY_URL + "?id=" + encodeURIComponent(id), { credentials: "omit" })
      .then((r) => r.json().then((b) => ({ ok: r.ok, b })))
      .then(({ ok, b }) => {
        if (b && b.paid) {
          state.paid = true;
          if (window.posthog) posthog.setPersonProperties({ hollyhaunt_paid: true, site: "halloweenfest" });
        } else if (ok) {
          store(ID_KEY, null); // Razorpay says this id is not a completed payment
          track("payment_rejected", { reason: (b && b.reason) || "unknown" });
        } else {
          state.error = "We couldn’t confirm your payment just now. Check your connection and try again.";
        }
      })
      .catch(() => { state.error = "We couldn’t confirm your payment just now. Check your connection and try again."; })
      .then(() => { state.checking = false; pending = null; emit(); return state; });
    return pending;
  }

  window.HollyPay = {
    state,
    isPaid: () => state.paid,
    hasPaymentId: () => !!store(ID_KEY),
    onChange(fn) { listeners.push(fn); fn(state); },
    // Resolves to true when unlocked; waits for an in-flight check first.
    ensure() { return state.paid ? Promise.resolve(true) : check().then((s) => s.paid); },
    // A payment id typed in by hand: store it and confirm it with the server.
    submit(id) {
      if (!/^pay_[A-Za-z0-9]+$/.test(id || "")) return Promise.resolve(false);
      store(ID_KEY, id);
      return (pending || Promise.resolve()).then(() => check()).then((s) => s.paid);
    },
    recheck: check,
  };
  check();
})();
