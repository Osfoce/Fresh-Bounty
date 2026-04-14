function LiveTricker() {
  return (
    <div className="w-full">

      {/* Ticker */}
      <div className="ticker mt-8 ">
        <div className="ticker-text text-green-400 font-semibold">
          🚀 Welcome to Happy Bounty • 💰 Earn Rewards • 🧩 Complete Tasks • ⚡ Instant Payouts • 🎯 New Bounties Added Daily •
        </div>
      </div>

      
      <style>{`
        .ticker {
          overflow: hidden;
          white-space: nowrap;
          background: #111827;
          padding: 10px;
        }

        .ticker-text {
          display: inline-block;
          padding-left: 100%;
          animation: scroll 12s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>

    </div>
  );
}

export default LiveTricker;