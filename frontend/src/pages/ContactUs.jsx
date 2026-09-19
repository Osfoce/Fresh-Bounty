import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FiArrowLeft,
  FiMail,
  FiMessageCircle,
  FiUsers,
  FiSend,
  FiTwitter,
  FiHash,
} from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully 🚀");
    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#FF1AC6]/10 blur-[130px]" />

        <div className="absolute right-[-100px] top-1/2 h-72 w-72 rounded-full bg-purple-500/[0.06] blur-[130px]" />

        <div className="absolute bottom-[-100px] left-[-80px] h-64 w-64 rounded-full bg-[#FF1AC6]/[0.05] blur-[120px]" />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 md:px-8 lg:px-10">
        {/* BACK BUTTON */}
        <div className="mb-10 sm:mb-14">
          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              px-3.5
              py-2
              text-sm
              font-medium
              text-white/70
              backdrop-blur-xl
              transition-all
              duration-200
              hover:border-[#FF1AC6]/30
              hover:bg-[#FF1AC6]/10
              hover:text-white
              active:scale-[0.98]
            "
          >
            <FiArrowLeft className="text-base text-[#FF1AC6]" />
            <span>Back</span>
          </Link>
        </div>

        {/* HEADER */}
        <section className="mb-10 max-w-3xl sm:mb-14">
          {/* LABEL */}
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#FF1AC6]/20
              bg-[#FF1AC6]/[0.06]
              px-3
              py-1.5
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF1AC6] shadow-[0_0_8px_rgba(255,26,198,0.8)]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF1AC6] sm:text-xs">
              Get In Touch
            </span>
          </div>

          {/* TITLE */}
          <h1
            className="
              text-3xl
              font-black
              leading-[1.1]
              tracking-tight
              sm:text-4xl
              md:text-5xl
            "
          >
            <span className="bg-gradient-to-r from-white via-white to-[#FF1AC6] bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-white/45
              sm:text-base
              sm:leading-7
              md:text-lg
            "
          >
            Have a question, partnership request, or feedback? Send us a
            message and our team will get back to you.
          </p>
        </section>

        {/* MAIN GRID */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* CONTACT FORM */}
          <section
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/[0.08]
              bg-gradient-to-br
              from-white/[0.06]
              to-white/[0.025]
              p-5
              shadow-[0_20px_60px_rgba(0,0,0,0.25)]
              backdrop-blur-xl
              sm:p-7
              md:p-8
            "
          >
            {/* CARD GLOW */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[#FF1AC6]/10 blur-3xl" />

            <div className="relative z-10">
              {/* FORM HEADER */}
              <div className="mb-7 flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#FF1AC6]/20
                    bg-[#FF1AC6]/10
                    text-[#FF1AC6]
                    shadow-[0_0_25px_rgba(255,26,198,0.08)]
                  "
                >
                  <FiMessageCircle className="text-lg" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Send us a message
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-white/40">
                    Fill out the form and we'll get back to you.
                  </p>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50"
                  >
                    Name
                  </label>

                  <div className="relative">
                    <FiUsers className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/40
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-white/20
                        transition-all
                        duration-200
                        focus:border-[#FF1AC6]/50
                        focus:bg-white/[0.04]
                        focus:ring-2
                        focus:ring-[#FF1AC6]/10
                      "
                      required
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-black/40
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-white/20
                        transition-all
                        duration-200
                        focus:border-[#FF1AC6]/50
                        focus:bg-white/[0.04]
                        focus:ring-2
                        focus:ring-[#FF1AC6]/10
                      "
                      required
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/50"
                  >
                    Message
                  </label>

                  <div className="relative">
                    <FiMessageCircle className="pointer-events-none absolute left-4 top-4 text-white/25" />

                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      rows="5"
                      className="
                        min-h-[130px]
                        w-full
                        resize-y
                        rounded-xl
                        border
                        border-white/10
                        bg-black/40
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        leading-6
                        text-white
                        outline-none
                        placeholder:text-white/20
                        transition-all
                        duration-200
                        focus:border-[#FF1AC6]/50
                        focus:bg-white/[0.04]
                        focus:ring-2
                        focus:ring-[#FF1AC6]/10
                      "
                      required
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-[#FF1AC6]
                    to-[#FF1AC6]/80
                    px-5
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_8px_25px_rgba(255,26,198,0.15)]
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:brightness-110
                    hover:shadow-[0_12px_35px_rgba(255,26,198,0.25)]
                    active:scale-[0.98]
                  "
                >
                  <span>Send Message</span>

                  <FiSend className="text-base transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            </div>
          </section>

          {/* INFO SECTION */}
          <div className="flex flex-col gap-4">
            {/* SUPPORT */}
            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[#FF1AC6]/25
                hover:bg-white/[0.05]
                sm:p-6
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#FF1AC6]/10
                    text-[#FF1AC6]
                    transition-colors
                    duration-300
                    group-hover:bg-[#FF1AC6]/15
                  "
                >
                  <FiMessageCircle />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Support
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-white/45">
                    We respond within 24–48 hours for user inquiries,
                    technical questions, and general support.
                  </p>
                </div>
              </div>
            </div>

            {/* PARTNERSHIPS */}
            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[#FF1AC6]/25
                hover:bg-white/[0.05]
                sm:p-6
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-purple-500/10
                    text-purple-400
                    transition-colors
                    duration-300
                    group-hover:bg-purple-500/15
                  "
                >
                  <FiUsers />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Partnerships
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-white/45">
                    Looking to collaborate? We're open to Web3 projects,
                    creators, influencers, and startups.
                  </p>
                </div>
              </div>
            </div>

            {/* SOCIALS */}
            <div
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.035]
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#FF1AC6]/25
                hover:bg-white/[0.05]
                sm:p-6
              "
            >
              <div className="mb-4 flex items-center gap-4">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#FF1AC6]/10
                    text-[#FF1AC6]
                  "
                >
                  <FiHash />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Connect with us
                  </h3>

                  <p className="mt-0.5 text-xs text-white/35">
                    Follow Happy Bounty
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {/* TWITTER */}
                <a
                  href="#"
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-black/20
                    px-3.5
                    py-3
                    text-sm
                    text-white/50
                    transition-all
                    duration-200
                    hover:border-white/10
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <FiTwitter className="shrink-0 text-base" />
                  <span className="truncate">Twitter / X</span>
                </a>

                {/* DISCORD */}
                <a
                  href="#"
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-black/20
                    px-3.5
                    py-3
                    text-sm
                    text-white/50
                    transition-all
                    duration-200
                    hover:border-white/10
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <FiMessageCircle className="shrink-0 text-base" />
                  <span className="truncate">Discord</span>
                </a>

                {/* TELEGRAM */}
                <a
                  href="#"
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.06]
                    bg-black/20
                    px-3.5
                    py-3
                    text-sm
                    text-white/50
                    transition-all
                    duration-200
                    hover:border-white/10
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <FiSend className="shrink-0 text-base" />
                  <span className="truncate">Telegram</span>
                </a>
              </div>
            </div>

            {/* EMAIL NOTE */}
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[#FF1AC6]/10
                bg-[#FF1AC6]/[0.04]
                px-5
                py-4
              "
            >
              <FiMail className="shrink-0 text-[#FF1AC6]" />

              <p className="text-xs leading-5 text-white/40">
                For urgent account or platform issues, please include as
                much relevant information as possible.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SPACE */}
        <div className="h-8 sm:h-12" />
      </main>
    </div>
  );
}