import hero from "../assets/images/hero.jpg";
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";

function LandingPage() {
  return (
    <div className="bg-black text-white overflow-x-hidden ">
      <div className=" py-2 mt-2 w-full">
        <NavBar />
      </div>
      
      {/* HERO */}
      <div
        className="relative rounded-lg mx-6 my-2 md:mx-10 lg:mx-16 py-6 bg-cover bg-center mt-14"
        style={{
         backgroundImage: `url(${hero})` ,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid white",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 rounded-lg"></div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-6 max-w-[650px]">
          <h1 className="font-style text-5xl md:text-6xl">
            Make a <br /> living from <br /> Web3
          </h1>

          <p className="mt-4 text-sm">
            Complete quests and earn cryptocurrency, tokens, and digital rewards
          </p>

          <button className="mt-4 bg-gray-800 px-4 py-2 rounded-lg border border-white hover:bg-gray-700 transition">
            How to earn →
          </button>
        </div>
      </div>

      {/* FEATURED */}
      <section className="px-6 md:px-10 lg:px-16 my-10">
        <h2 className="text-3xl mb-6">🔥 Featured Bounties</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {["Design NFT", "Write Article", "Smart Contract"].map((item, i) => (
            <div
              key={i}
              className="bg-[#2D2D2D] p-6 rounded-xl border border-white/30 hover:border-white/60 transition"
            >
              <h3 className="text-lg font-semibold">{item}</h3>

              <p className="text-sm text-gray-300 mt-2">
                Sample bounty description
              </p>

              <p className="mt-4 font-semibold">Reward: 0.2 ETH</p>

              <button className="mt-4 border px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">
                View Task
              </button>
            </div>
          ))}
        </div>
      </section>
      {/* <!-- HOW IT WORKS --> */}
      <section id="bounty" className="mx-auto text-white m-6 md:m-10">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          ⚡ How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bounty-card opacity-0 translate-y-10 transition-all duration-700">
            <h3 className="text-xl font-semibold mb-2">1️⃣ Create Account</h3>
            <p className="text-gray-400">Sign up and connect your wallet.</p>
          </div>

          <div className="bounty-card opacity-0 translate-y-10 transition-all duration-700">
            <h3 className="text-xl font-semibold mb-2">2️⃣ Complete Task</h3>
            <p className="text-gray-400">Work on bounties and submit proof.</p>
          </div>

          <div className="bounty-card opacity-0 translate-y-10 transition-all duration-700">
            <h3 className="text-xl font-semibold mb-2">3️⃣ Earn Crypto</h3>
            <p className="text-gray-400">
              Get paid instantly in crypto rewards.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default LandingPage;
