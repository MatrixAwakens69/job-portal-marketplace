import EmployerHeader from "../components/EmployerHeader";
import Footer from "../components/Footer";

const EmployerLanding = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#13293D]">
      <EmployerHeader />
      <main className="flex-grow flex flex-col items-center justify-center bg-[#16324F] text-white mt-16">
        <section
          className="text-center mb-8 bg-[#18435A] w-full flex flex-col items-center justify-center"
          style={{ height: "900px", maxHeight: "100vh" }}
        >
          <h1 className="text-8xl mb-8 text-[#FFFD82]">Welcome Employers</h1>
          <p className="text-base mb-4 text-[#FFFD82]">
            Find the best candidates for your company.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 mb-4 md:mb-0 md:mr-4 rounded-full text-[#FFFD82] focus:outline-none focus:ring-2 focus:ring-[#3E92CC]"
            />
            <a
              href="/register/employer"
              className="px-6 py-3 bg-[#3E92CC] text-[#13293D] rounded-full hover:bg-[#2A628F] transition"
            >
              Join Now
            </a>
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-4xl mb-4 text-[#FFFD82]">Why Choose Us?</h2>
          <p className="text-lg mb-4 text-[#FFFD82]">
            We connect employers with top candidates and provide the best tools
            to find the right fit for your company.
          </p>
          <div className="flex flex-col md:flex-row justify-center">
            <div className="bg-[#3E92CC] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">Top Candidates</h3>
              <p className="text-[#FFFD82]">
                Get noticed by the best candidates and hire the right talent.
              </p>
            </div>
            <div className="bg-[#3E92CC] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">
                Recruitment Tools
              </h3>
              <p className="text-[#FFFD82]">
                Access resources and tools to streamline your recruitment
                process.
              </p>
            </div>
            <div className="bg-[#3E92CC] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">
                Community Support
              </h3>
              <p className="text-[#FFFD82]">
                Join a community of employers and professionals to grow your
                network.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-4xl mb-4 text-[#FFFD82]">How It Works</h2>
          <p className="text-lg mb-4 text-[#FFFD82]">
            Follow these simple steps to get started and find the best
            candidates.
          </p>
          <div className="flex flex-col md:flex-row justify-center">
            <div className="bg-[#3E92CC] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">1. Sign Up</h3>
              <p className="text-[#FFFD82]">
                Create your profile and start exploring candidates.
              </p>
            </div>
            <div className="bg-[#3E92CC] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">2. Connect</h3>
              <p className="text-[#FFFD82]">
                Connect with candidates and post job openings that match your
                requirements.
              </p>
            </div>
            <div className="bg-[#3E92CC] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">3. Hire</h3>
              <p className="text-[#FFFD82]">
                Hire the best candidates and take your company to the next
                level.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-4xl mb-4 text-[#FFFD82]">Testimonials</h2>
          <p className="text-lg mb-4 text-[#FFFD82]">
            Hear from employers who have successfully found top talent with us.
          </p>
          <div className="flex flex-col md:flex-row justify-center">
            <div className="bg-[#3E92CC] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <p className="text-[#FFFD82]">
                "This platform helped us find the best candidates for our
                company. The resources and support were invaluable."
              </p>
              <p className="mt-2 text-[#FFFD82]">- Jane Doe, CEO</p>
            </div>
            <div className="bg-[#3E92CC] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <p className="text-[#FFFD82]">
                "We connected with top talent and found the perfect candidates
                to join our team."
              </p>
              <p className="mt-2 text-[#FFFD82]">- John Smith, HR Manager</p>
            </div>
          </div>
        </section>

        <section className="text-center mb-8 p-10 bg-[#18435A] w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl mb-4 text-[#FFFD82]">Get Started Today</h2>
          <p className="text-lg mb-4 text-[#FFFD82]">
            Join thousands of employers who are finding top talent with us.
          </p>
          <a
            href="/register/employer"
            className="px-6 py-3 bg-[#3E92CC] text-[#13293D] rounded-full hover:bg-[#2A628F] transition"
          >
            Join Now
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EmployerLanding;
