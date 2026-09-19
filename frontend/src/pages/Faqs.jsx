import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiChevronDown,
  FiSearch,
  FiMessageCircle,
} from "react-icons/fi";

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I earn on Happy Bounty?",
      answer:
        "Users earn rewards by completing campaigns, referrals, social tasks, and community activities.",
    },
    {
      question: "How long do withdrawals take?",
      answer:
        "Withdrawals are usually processed within 24–72 hours after verification.",
    },
    {
      question: "Can I create multiple accounts?",
      answer:
        "No. Multiple accounts may lead to account suspension.",
    },
    {
      question: "Why was my submission rejected?",
      answer:
        "Your submission may be rejected if task instructions were not followed correctly.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF1AC6]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 md:px-8 lg:px-10">
        
        {/* HEADER */}
        <section className="relative mb-10 flex flex-col items-center text-center sm:mb-14">
          
          {/* BACK BUTTON - LEFT */}
          <div className="mb-10 flex w-full justify-start sm:mb-12">
            <Link
              to="/"
              className="
                inline-flex items-center gap-2
                rounded-xl
                border border-white/10
                bg-white/[0.04]
                px-3.5 py-2
                text-sm font-medium
                text-white/70
                backdrop-blur-md
                transition-all duration-200
                hover:border-[#FF1AC6]/30
                hover:bg-[#FF1AC6]/10
                hover:text-white
                active:scale-95
              "
            >
              <FiArrowLeft className="text-base text-[#FF1AC6]" />
              <span>Back</span>
            </Link>
          </div>

          {/* SMALL LABEL */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF1AC6]/20 bg-[#FF1AC6]/[0.06] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF1AC6] shadow-[0_0_8px_rgba(255,26,198,0.8)]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FF1AC6] sm:text-xs">
              Help Center
            </span>
          </div>

          {/* TITLE */}
          <h1
            className="
              max-w-4xl
              text-3xl
              font-black
              leading-[1.1]
              tracking-tight
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            <span className="bg-gradient-to-r from-white via-white to-[#FF1AC6] bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-4
              max-w-2xl
              px-2
              text-sm
              leading-6
              text-white/45
              sm:mt-5
              sm:text-base
              sm:leading-7
              md:text-lg
            "
          >
            Find answers about rewards, withdrawals, campaigns,
            referrals, and everything related to Happy Bounty.
          </p>
        </section>

        {/* SEARCH */}
        <div className="mx-auto mb-8 w-full max-w-2xl sm:mb-10">
          <div
            className="
              flex items-center gap-3
              rounded-2xl
              border border-white/10
              bg-white/[0.04]
              px-4
              py-3.5
              shadow-[0_10px_40px_rgba(0,0,0,0.2)]
              backdrop-blur-xl
              transition-all duration-200
              focus-within:border-[#FF1AC6]/40
              focus-within:bg-white/[0.06]
              focus-within:shadow-[0_0_30px_rgba(255,26,198,0.08)]
            "
          >
            <FiSearch className="shrink-0 text-lg text-white/30" />

            <input
              type="text"
              placeholder="Search questions..."
              className="
                min-w-0
                flex-1
                bg-transparent
                text-sm
                text-white
                outline-none
                placeholder:text-white/25
                sm:text-base
              "
            />
          </div>
        </div>

        {/* FAQ CARDS */}
        <section className="mx-auto w-full max-w-3xl space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="
                group
                overflow-hidden
                rounded-2xl
                border border-white/[0.08]
                bg-white/[0.035]
                backdrop-blur-xl
                transition-all duration-300
                hover:border-[#FF1AC6]/25
                hover:bg-white/[0.05]
                open:border-[#FF1AC6]/30
                open:bg-[#FF1AC6]/[0.035]
              "
            >
              <summary
                className="
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  gap-4
                  px-4
                  py-4
                  sm:px-5
                  sm:py-5
                "
              >
                {/* QUESTION */}
                <span
                  className="
                    min-w-0
                    text-left
                    text-sm
                    font-semibold
                    leading-5
                    text-white/85
                    transition-colors
                    group-hover:text-white
                    sm:text-base
                    sm:leading-6
                  "
                >
                  {faq.question}
                </span>

                {/* ARROW */}
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border border-white/10
                    bg-white/[0.04]
                    text-white/40
                    transition-all
                    duration-300
                    group-hover:border-[#FF1AC6]/30
                    group-hover:text-[#FF1AC6]
                    group-open:rotate-180
                    group-open:border-[#FF1AC6]/30
                    group-open:bg-[#FF1AC6]/10
                    group-open:text-[#FF1AC6]
                  "
                >
                  <FiChevronDown className="text-sm" />
                </span>
              </summary>

              {/* ANSWER */}
              <div className="border-t border-white/[0.06] px-4 pb-5 pt-4 sm:px-5">
                <p
                  className="
                    text-left
                    text-sm
                    leading-6
                    text-white/45
                    sm:text-[15px]
                    sm:leading-7
                  "
                >
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </section>

        {/* SUPPORT */}
        <section
          className="
            mx-auto
            mt-10
            w-full
            max-w-3xl
            overflow-hidden
            rounded-2xl
            border border-[#FF1AC6]/15
            bg-gradient-to-br
            from-[#FF1AC6]/[0.08]
            via-white/[0.025]
            to-purple-500/[0.04]
            p-6
            text-center
            backdrop-blur-xl
            sm:mt-14
            sm:rounded-3xl
            sm:p-8
          "
        >
          {/* ICON */}
          <div
            className="
              mx-auto
              mb-4
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border border-[#FF1AC6]/20
              bg-[#FF1AC6]/10
              text-[#FF1AC6]
              shadow-[0_0_25px_rgba(255,26,198,0.12)]
            "
          >
            <FiMessageCircle className="text-lg" />
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="bg-gradient-to-r from-white to-[#FF1AC6] bg-clip-text text-transparent">
              Still have questions?
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/45 sm:text-base">
            Our support team is ready to help you whenever you need us.
          </p>

          {/* CONTACT BUTTON */}
          <Link
            to="/contact"
            className="
              mt-5
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-[#FF1AC6]
              px-6
              py-3
              text-sm
              font-bold
              text-white
              shadow-[0_8px_25px_rgba(255,26,198,0.18)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#ff3bce]
              hover:shadow-[0_12px_30px_rgba(255,26,198,0.28)]
              active:scale-[0.98]
              sm:px-7
            "
          >
            Contact Support
          </Link>
        </section>

        {/* BOTTOM SPACE */}
        <div className="h-8 sm:h-12" />
      </main>
    </div>
  );
}