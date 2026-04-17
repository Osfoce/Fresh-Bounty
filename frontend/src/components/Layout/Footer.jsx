import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";



function Footer() {
  return (
    <footer className="bg-[#111] text-white px-6 py-8">
      <div className="max-w-screen-2xl mx-auto grid md:grid-cols-4 gap-14">
        <div>
          <h3 className="text-xl font-semibold mb-3">Happy Bounty</h3>
          <p className="text-gray-400 text-sm">
            Earn crypto by completing Web3 tasks and bounties.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Platform</h4>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>Browse Tasks</li>
            <li>Categories</li>
            <li>Leaderboard</li>
            <li>Rewards</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>Docs</li>
            <li>Blog</li>
            <li>Help Center</li>
            <li>Community</li>
          </ul>
        </div>

          <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
         <div className="flex flex-row gap-4 cursor-pointer">
          {/* <FaDiscord />
          <FaGithub /> */}
          <FaTwitter />
</div>
          </div>
         
        
      </div>
      <div className="border-t border-white/20 mt-8 pt-4 text-center text-gray-500 text-sm">
        © 2026 Happy Bounty. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;
