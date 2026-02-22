function HomePage() {
  return (
    <section className="home-page">
      <h1>Welcome to Odin Cart</h1>
      <p>
        Browse quality essentials, add what you need, and manage your cart in
        real time.
      </p>
      <div className="home-grid">
        <article>
          <h2>Fast Shopping</h2>
          <p>
            Use quantity controls directly on product cards for quick ordering.
          </p>
        </article>
        <article>
          <h2>Live Cart Updates</h2>
          <p>
            Your cart count in the navbar updates instantly as you add or remove
            items.
          </p>
        </article>
        <article>
          <h2>Simple Flow</h2>
          <p>
            Move between home, shop, and cart with clear navigation on every
            page.
          </p>
        </article>
      </div>
    </section>
  );
}

export default HomePage;
