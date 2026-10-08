import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, CheckCircle2, CreditCard, LoaderCircle, LockKeyhole } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import './checkout.css';
import { Navigate } from 'react-router-dom';

const money = (amount) => `$${Number(amount).toFixed(2)}`;

export default function CheckoutPage() {
  const { cartItems, subtotal, total } = useCartStore();
  const { user } = useUserStore();
  const [status, setStatus] = useState('ready');
  const [receipt, setReceipt] = useState(null);
  const timer = useRef(null);
  const submitting = useRef(false);
  const quantity = cartItems.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const simulatePayment = (event) => {
    event.preventDefault();
    if (submitting.current || cartItems.length === 0) return;
    submitting.current = true;
    setStatus('processing');
    // Only a local UI simulation: no card collection, payment API, or order write.
    const demoReceipt = { amount: total, quantity, reference: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}` };
    timer.current = setTimeout(() => {
      setReceipt(demoReceipt);
      setStatus('success');
    }, 1400);
  };

  if (status === 'success') {
    return <Navigate to="/purchase-success" />
  }

  if (cartItems.length === 0) {
    return (
      <main className='demo-checkout checkout-result'>
        <div className='result-card'>
          <span className='demo-badge'>DEMO MODE</span>
          <h1>Your cart is empty</h1>
          <p>Add some products to try the demo checkout.</p>
          <Link className='checkout-pay' to='/'>Browse products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className='demo-checkout'>
      <div className='checkout-layout'>
        <section className='checkout-summary' aria-label='Order summary'>
          <div className='checkout-topbar'>
            <Link to='/cart' className='checkout-back'><ArrowLeft size={16} /> Back</Link>
            <span className='demo-badge'>DEMO MODE</span>
          </div>
          <p className='checkout-eyebrow'>Your order</p>
          <h1 className='checkout-amount'>{money(total)}</h1>
          <p className='checkout-muted'>{quantity} {quantity === 1 ? 'item' : 'items'} in your cart</p>
          <div className='checkout-products'>
            {cartItems.map((item) => (
              <article className='checkout-product' key={item._id}>
                {item.image && <img src={item.image} alt={item.name} />}
                <div className='checkout-product-info'>
                  <h2>{item.name}</h2>
                  <p className='checkout-muted'>Qty {item.quantity} · {money(item.price)} each</p>
                </div>
                <strong>{money(item.price * item.quantity)}</strong>
              </article>
            ))}
          </div>
          <dl className='checkout-totals'>
            <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            {subtotal > total && <div><dt>Discount</dt><dd>−{money(subtotal - total)}</dd></div>}
            <div className='checkout-total'><dt>Total</dt><dd>{money(total)}</dd></div>
          </dl>
        </section>

        <section className='checkout-form-panel' aria-label='Demo payment'>
          <form onSubmit={simulatePayment}>
            <div className='demo-notice'><LockKeyhole size={18} aria-hidden='true' /><div><strong>This is a demo checkout.</strong><br />No real payments. Use the preset test card below.</div></div>
            <div className='checkout-divider'><span>Demo card payment</span></div>
            <fieldset disabled={status === 'processing'}>
              <label className='checkout-field'>Email
                <input type='email' name='email' defaultValue={user?.email || 'demo@example.com'} required autoComplete='email' />
              </label>
              <div className='checkout-field'>
                <span id='test-card-label'>Card information</span>
                <div className='demo-card-details' aria-labelledby='test-card-label'>
                  <div className='demo-card-number'><span>4242 4242 4242 4242</span><span className='card-brand'><CreditCard size={18} aria-hidden='true' /> TEST</span></div>
                  <div className='demo-card-bottom'><span>12 / 30</span><span>123 <LockKeyhole size={14} aria-hidden='true' /></span></div>
                </div>
                <small>Preset demo details — no real card information needed.</small>
              </div>
              <label className='checkout-field'>Cardholder name
                <input type='text' name='name' defaultValue={user?.name || 'Demo Customer'} required maxLength={100} autoComplete='name' />
              </label>
              <label className='checkout-field'>Country or region
                <select name='country' defaultValue='Namibia'><option>Namibia</option><option>South Africa</option><option>Botswana</option><option>Zambia</option><option>Zimbabwe</option><option>Other</option></select>
              </label>
              <div className='checkout-demo-detail'><Check size={18} aria-hidden='true' /><span>Payment is simulated locally. No payment details are submitted or saved.</span></div>
              <button type='submit' className='checkout-pay' disabled={status === 'processing'}>
                {status === 'processing' ? <><LoaderCircle size={18} className='checkout-spinner' /> Simulating payment…</> : `Pay ${money(total)} · Demo`}
              </button>
            </fieldset>
            <p className='checkout-footer' role='status' aria-live='polite'>{status === 'processing' ? 'Processing your demo payment. Please wait.' : 'Demo checkout · No money will be charged'}</p>
          </form>
        </section>
      </div>
    </main>
  );
}
