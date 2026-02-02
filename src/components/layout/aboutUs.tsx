export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-emerald-50">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="text-emerald-600">MediStore</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Your trusted online medicine store, delivering genuine healthcare
            products right to your doorstep.
          </p>
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            MediStore is a modern online pharmacy platform designed to make
            healthcare accessible, affordable, and reliable for everyone. We
            partner with verified sellers and pharmacies to ensure that every
            medicine you receive is 100% authentic.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From everyday essentials to specialised medicines, MediStore brings
            everything together in one easy-to-use platform.
          </p>
        </div>

        {/* IMAGE */}
        <div>
          <img
            src="/img/about-doctor.jpg"
            alt="Pharmacy"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose MediStore
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <Feature
              title="Genuine Medicines"
              desc="All medicines are sourced from verified sellers and pharmacies."
            />
            <Feature
              title="Fast Delivery"
              desc="Quick and reliable home delivery across the country."
            />
            <Feature
              title="Secure Payments"
              desc="Multiple secure payment options for safe checkout."
            />
            <Feature
              title="Trusted Support"
              desc="Dedicated customer support to assist you anytime."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* Reusable Feature Card */
function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm text-center">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
