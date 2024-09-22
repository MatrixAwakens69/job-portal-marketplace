import StudentHeader from "../components/StudentHeader";
import Footer from "../components/Footer";

const StudentLanding = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#2B3A67]">
      <StudentHeader />
      <main className="flex-grow flex flex-col items-center justify-center bg-[#2B3A67] text-white mt-16">
        <section
          className="text-center mb-8 bg-[#B56B45] w-full flex flex-col items-center justify-center"
          style={{ height: "900px", maxHeight: "100vh" }}
        >
          <h1 className="text-8xl mb-8 text-[#FFFD82]">Advance your career</h1>
          <p className="text-base mb-4 text-[#FFFD82]">
            Join millions of students on the best place to get hired.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 mb-4 md:mb-0 md:mr-4 rounded-full text-[#FFFD82] focus:outline-none focus:ring-2 focus:ring-[#FF9B71]"
            />
            <a
              href="/register"
              className="px-6 py-3 bg-[#FF9B71] text-[#2B3A67] rounded-full hover:bg-[#E84855] transition"
            >
              Join Now
            </a>
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-4xl mb-4 text-[#FFFD82]">Why Choose Us?</h2>
          <p className="text-lg mb-4 text-[#FFFD82]">
            We connect students with top employers and provide the best tools to
            advance your career.
          </p>
          <div className="flex flex-col md:flex-row justify-center">
            <div className="bg-[#FF9B71] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">Top Employers</h3>
              <p className="text-[#FFFD82]">
                Get noticed by the best companies and land your dream job.
              </p>
            </div>
            <div className="bg-[#FF9B71] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">Career Tools</h3>
              <p className="text-[#FFFD82]">
                Access resources and tools to help you succeed in your career.
              </p>
            </div>
            <div className="bg-[#FF9B71] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">
                Community Support
              </h3>
              <p className="text-[#FFFD82]">
                Join a community of students and professionals to grow your
                network.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-4xl mb-4 text-[#FFFD82]">How It Works</h2>
          <p className="text-lg mb-4 text-[#FFFD82]">
            Follow these simple steps to get started and advance your career.
          </p>
          <div className="flex flex-col md:flex-row justify-center">
            <div className="bg-[#FF9B71] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">1. Sign Up</h3>
              <p className="text-[#FFFD82]">
                Create your profile and start exploring opportunities.
              </p>
            </div>
            <div className="bg-[#FF9B71] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">2. Connect</h3>
              <p className="text-[#FFFD82]">
                Connect with employers and apply for jobs that match your
                skills.
              </p>
            </div>
            <div className="bg-[#FF9B71] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <h3 className="text-2xl mb-2 text-[#FFFD82]">3. Get Hired</h3>
              <p className="text-[#FFFD82]">
                Land your dream job and take the next step in your career.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center mb-8">
          <h2 className="text-4xl mb-4 text-[#FFFD82]">Testimonials</h2>
          <p className="text-lg mb-4 text-[#FFFD82]">
            Hear from students who have successfully advanced their careers with
            us.
          </p>
          <div className="flex flex-col md:flex-row justify-center">
            <div className="bg-[#FF9B71] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <p className="text-[#FFFD82]">
                "This platform helped me land my dream job! The resources and
                support were invaluable."
              </p>
              <p className="mt-2 text-[#FFFD82]">- Jane Doe</p>
            </div>
            <div className="bg-[#FF9B71] bg-opacity-10 p-4 rounded-lg shadow-lg m-2">
              <p className="text-[#FFFD82]">
                "I connected with top employers and found the perfect
                opportunity to advance my career."
              </p>
              <p className="mt-2 text-[#FFFD82]">- John Smith</p>
            </div>
          </div>
        </section>

        <section className="text-center mb-8 p-10 bg-[#B56B45] w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl mb-4 text-[#FFFD82]">Get Started Today</h2>
          <p className="text-lg mb-4 text-[#FFFD82]">
            Join millions of students who are advancing their careers with us.
          </p>
          <a
            href="/register"
            className="px-6 py-3 bg-[#FF9B71] text-[#2B3A67] rounded-full hover:bg-[#E84855] transition"
          >
            Join Now
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StudentLanding;
