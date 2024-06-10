import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HR Management System</h1>
          <nav>
            <Link href="/" className="px-4">Home</Link>
            <Link href="/about" className="px-4">About</Link>
            <Link href="/contact" className="px-4">Contact</Link>
            <Link href="/login" className="px-4 bg-blue-500 text-black rounded">Login</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="text-center text-black py-20 bg-gray-100">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our HR Management System</h2>
          <p className="text-lg mb-8">Streamline your HR processes and enhance your team's productivity.</p>
        </section>

        <section className="py-20">
          <h3 className="text-3xl font-bold mb-8 text-center">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-black shadow-lg text-center">
              <h4 className="text-2xl font-bold mb-4">Employee Management</h4>
              <p>Manage employee records, track attendance, and handle payroll with ease.</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-black shadow-lg text-center">
              <h4 className="text-2xl font-bold mb-4">Performance Tracking</h4>
              <p>Monitor employee performance and provide feedback to help them grow.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-black text-center">
              <h4 className="text-2xl font-bold mb-4">Recruitment</h4>
              <p>Streamline the recruitment process and find the best talent for your team.</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <h3 className="text-3xl font-bold mb-8 text-black text-center">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-black shadow-lg text-center">
              <h4 className="text-2xl font-bold mb-4">User-Friendly Interface</h4>
              <p>Our system is designed to be intuitive and easy to use for all your HR needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-black shadow-lg text-center">
              <h4 className="text-2xl font-bold mb-4">Secure and Reliable</h4>
              <p>We prioritize security to ensure your data is always protected.</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-black shadow-lg text-center">
              <h4 className="text-2xl font-bold mb-4">24/7 Support</h4>
              <p>Our support team is always available to assist you with any questions or issues.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-4  text-black text-center">
        <p>&copy; {new Date().getFullYear()} HR Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
