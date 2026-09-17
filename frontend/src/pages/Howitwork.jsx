
import { useEffect, useRef, useState } from "react";
import {
  FiBriefcase,
  FiCheck,
  FiGlobe,
  FiLock,
  FiShield,
  FiUser,
  FiUsers,
  FiZap,
} from "react-icons/fi";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  /* =====================================================
     SCROLL REVEAL
     DESKTOP ONLY
  ===================================================== */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`how-it-works-section ${
        isVisible ? "how-it-works-visible" : ""
      }`}
    >
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}
      <div className="how-it-works-header">
        <span className="how-it-works-label">
          <span className="label-dot" />
          HOW IT WORKS
        </span>

        <h2>
          Work. Earn.{" "}
          <span>Build.</span>
        </h2>

        <p>
          A simple way to discover Web3 opportunities, complete
          meaningful work, and earn rewards.
        </p>
      </div>

      {/* =====================================================
          CARDS
      ===================================================== */}
      <div className="how-it-works-grid">
        {/* ===================================================
            CARD 1 — DISCOVER
        =================================================== */}
        <div className="how-it-works-card">
          <div className="card-number">01</div>

          <div className="visual-area">
            <div className="discover-visual">
              <div className="discover-wallet">
                <div className="wallet-top">
                  <span />
                  <span />
                </div>

                <div className="wallet-screen">
                  <FiZap className="wallet-icon" />

                  <div className="wallet-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>

              <div className="discover-orbit orbit-one">
                <span className="orbit-dot pink-dot" />
              </div>

              <div className="discover-orbit orbit-two">
                <span className="orbit-dot purple-dot" />
              </div>

              <FiZap className="discover-icon" />
            </div>
          </div>

          <div className="card-content">
            <div className="card-icon">
              <FiGlobe />
            </div>

            <h3>Discover Bounties</h3>

            <p>
              Explore opportunities from Web3 projects and
              find work that matches your skills.
            </p>
          </div>
        </div>

        {/* ===================================================
            CARD 2 — CONNECT
        =================================================== */}
        <div className="how-it-works-card">
          <div className="card-number">02</div>

          <div className="visual-area">
            <div className="connect-visual">
              <div className="dashboard-window">
                <div className="dashboard-header">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="dashboard-body">
                  <div className="dashboard-sidebar">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="dashboard-main">
                    <div className="dashboard-title" />

                    <div className="dashboard-cards">
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="dashboard-line" />
                    <div className="dashboard-line short" />
                  </div>
                </div>
              </div>

              <div className="user-node user-one">
                <FiUser />
              </div>

              <div className="user-node user-two">
                <FiUsers />
              </div>

              <div className="connection-line line-one" />
              <div className="connection-line line-two" />
            </div>
          </div>

          <div className="card-content">
            <div className="card-icon">
              <FiUser />
            </div>

            <h3>Connect & Contribute</h3>

            <p>
              Join projects, submit your work, and collaborate
              with teams building the next generation of Web3.
            </p>
          </div>
        </div>

        {/* ===================================================
            CARD 3 — COMPLETE
        =================================================== */}
        <div className="how-it-works-card">
          <div className="card-number">03</div>

          <div className="visual-area">
            <div className="complete-visual">
              <div className="task-window">
                <div className="task-header">
                  <span>BOUNTY</span>

                  <div className="task-status">
                    <span />
                    ACTIVE
                  </div>
                </div>

                <div className="task-title">
                  <span />
                  <span />
                </div>

                <div className="task-progress">
                  <div />
                </div>

                <div className="task-bottom">
                  <FiCheck />

                  <span>Task completed</span>
                </div>
              </div>

              <div className="completion-ring ring-one" />
              <div className="completion-ring ring-two" />

              <div className="completion-check">
                <FiCheck />
              </div>
            </div>
          </div>

          <div className="card-content">
            <div className="card-icon">
              <FiCheck />
            </div>

            <h3>Complete the Work</h3>

            <p>
              Deliver quality work, meet the requirements, and
              get your contribution reviewed by the project.
            </p>
          </div>
        </div>

        {/* ===================================================
            CARD 4 — EARN
        =================================================== */}
        <div className="how-it-works-card">
          <div className="card-number">04</div>

          <div className="visual-area">
            <div className="earn-visual">
              <div className="earning-box">
                <div className="earning-icon">
                  <FiZap />
                </div>

                <div className="earning-info">
                  <span>REWARD</span>
                  <strong>+450 USDC</strong>
                </div>
              </div>

              <div className="energy-ring energy-one" />
              <div className="energy-ring energy-two" />

              <div className="energy-particle particle-one" />
              <div className="energy-particle particle-two" />
              <div className="energy-particle particle-three" />

              <FiShield className="earn-shield" />
            </div>
          </div>

          <div className="card-content">
            <div className="card-icon">
              <FiLock />
            </div>

            <h3>Get Rewarded</h3>

            <p>
              Receive your rewards and build your reputation
              while contributing to the Web3 ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CSS
      ===================================================== */}
      <style>{`
        /* ========================================
           SECTION
        ======================================== */

        .how-it-works-section {
          position: relative;
          width: 100%;
          padding: 80px 24px;
          overflow: hidden;
          background: #070708;
          color: white;
        }

        /* ========================================
           HEADER
        ======================================== */

        .how-it-works-header {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin: 0 auto 50px;
          text-align: center;
        }

        .how-it-works-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.03);
          color: #9ca3af;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
        }

        .label-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #ff1ac6;
          box-shadow: 0 0 10px rgba(255, 26, 198, 0.8);
        }

        .how-it-works-header h2 {
          margin: 18px 0 12px;
          font-size: clamp(2rem, 5vw, 3.5rem);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .how-it-works-header h2 span {
          background: linear-gradient(
            90deg,
            #ff1ac6,
            #ff62d8,
            #a855f7
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .how-it-works-header p {
          max-width: 580px;
          margin: 0 auto;
          color: #71717a;
          font-size: 14px;
          line-height: 1.7;
        }

        /* ========================================
           GRID
        ======================================== */

        .how-it-works-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* ========================================
           OUTER CARD
           KEPT AS THE ORIGINAL STYLE
        ======================================== */

        .how-it-works-card {
          position: relative;
          min-height: 350px;
          padding: 22px 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.045),
              rgba(255, 255, 255, 0.015)
            );
          transition:
            border-color 0.35s ease,
            background 0.35s ease,
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        .how-it-works-card:hover {
          border-color: rgba(255, 26, 198, 0.18);
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.06),
              rgba(255, 255, 255, 0.02)
            );
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        }

        .card-number {
          position: absolute;
          top: 16px;
          right: 18px;
          color: rgba(255, 255, 255, 0.2);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
        }

        /* ========================================
           VISUAL AREA
        ======================================== */

        .visual-area {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 155px;
          margin-bottom: 18px;
        }

        /* ========================================
           CARD CONTENT
        ======================================== */

        .card-content {
          position: relative;
          z-index: 2;
        }

        .card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          margin-bottom: 12px;
          border: 1px solid rgba(255, 26, 198, 0.14);
          border-radius: 9px;
          background: rgba(255, 26, 198, 0.07);
          color: #ff1ac6;
          font-size: 14px;
        }

        .card-content h3 {
          margin: 0 0 8px;
          color: white;
          font-size: 16px;
          font-weight: 600;
        }

        .card-content p {
          margin: 0;
          color: #71717a;
          font-size: 12px;
          line-height: 1.65;
        }

        /* ========================================
           DISCOVER VISUAL
        ======================================== */

        .discover-visual {
          position: relative;
          width: 175px;
          height: 85px;
        }

        .discover-wallet {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          width: 110px;
          height: 68px;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          background: rgba(16, 16, 17, 0.92);
          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.45),
            inset 0 0 20px rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(15px);
        }

        .wallet-top {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 18px;
          padding: 0 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .wallet-top span {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.25);
        }

        .wallet-screen {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px;
        }

        .wallet-icon {
          color: #ff1ac6;
          font-size: 16px;
          filter: drop-shadow(0 0 8px rgba(255, 26, 198, 0.6));
        }

        .wallet-lines {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 5px;
        }

        .wallet-lines span {
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
        }

        .wallet-lines span:nth-child(1) {
          width: 75%;
        }

        .wallet-lines span:nth-child(2) {
          width: 55%;
        }

        .wallet-lines span:nth-child(3) {
          width: 35%;
        }

        .discover-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-one {
          width: 135px;
          height: 58px;
          transform:
            translate(-50%, -50%)
            rotate(-15deg);
        }

        .orbit-two {
          width: 155px;
          height: 68px;
          border-color: rgba(168, 85, 247, 0.1);
          transform:
            translate(-50%, -50%)
            rotate(25deg);
        }

        .orbit-dot {
          position: absolute;
          top: -4px;
          left: 50%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          transform: translateX(-50%);
        }

        .pink-dot {
          background: #ff1ac6;
          box-shadow:
            0 0 8px #ff1ac6,
            0 0 18px rgba(255, 26, 198, 0.7);
        }

        .purple-dot {
          background: #a855f7;
          box-shadow:
            0 0 8px #a855f7,
            0 0 18px rgba(168, 85, 247, 0.7);
        }

        .discover-icon {
          position: absolute;
          right: 7px;
          top: 8px;
          color: rgba(255, 26, 198, 0.6);
          font-size: 13px;
        }

        /* ========================================
           CONNECT VISUAL
        ======================================== */

        .connect-visual {
          position: relative;
          width: 175px;
          height: 95px;
        }

        .dashboard-window {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          width: 155px;
          height: 88px;
          overflow: hidden;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 11px;
          background: rgba(15, 15, 17, 0.95);
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.4);
        }

        .dashboard-header {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 17px;
          padding: 0 7px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .dashboard-header span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
        }

        .dashboard-body {
          display: flex;
          height: calc(100% - 17px);
        }

        .dashboard-sidebar {
          display: flex;
          width: 28px;
          flex-direction: column;
          gap: 7px;
          padding: 8px 7px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .dashboard-sidebar span {
          width: 100%;
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
        }

        .dashboard-sidebar span:first-child {
          background: rgba(255, 26, 198, 0.5);
        }

        .dashboard-main {
          flex: 1;
          padding: 9px;
        }

        .dashboard-title {
          width: 48%;
          height: 5px;
          margin-bottom: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.16);
        }

        .dashboard-cards {
          display: flex;
          gap: 5px;
          margin-bottom: 8px;
        }

        .dashboard-cards span {
          flex: 1;
          height: 22px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.035);
        }

        .dashboard-cards span:first-child {
          border-color: rgba(255, 26, 198, 0.15);
          background: rgba(255, 26, 198, 0.06);
        }

        .dashboard-line {
          width: 80%;
          height: 3px;
          margin-bottom: 5px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
        }

        .dashboard-line.short {
          width: 55%;
        }

        .user-node {
          position: absolute;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          border: 1px solid rgba(255, 26, 198, 0.2);
          border-radius: 50%;
          background: rgba(20, 20, 22, 0.95);
          color: #ff1ac6;
          font-size: 11px;
          box-shadow: 0 0 18px rgba(255, 26, 198, 0.12);
        }

        .user-one {
          left: -3px;
          top: 13px;
        }

        .user-two {
          right: -3px;
          bottom: 13px;
          color: #a855f7;
          border-color: rgba(168, 85, 247, 0.2);
        }

        .connection-line {
          position: absolute;
          z-index: 1;
          height: 1px;
          width: 35px;
          background: linear-gradient(
            90deg,
            rgba(255, 26, 198, 0),
            rgba(255, 26, 198, 0.4)
          );
        }

        .line-one {
          left: 3px;
          top: 29px;
          transform: rotate(20deg);
        }

        .line-two {
          right: 3px;
          bottom: 29px;
          transform: rotate(20deg);
          background: linear-gradient(
            90deg,
            rgba(168, 85, 247, 0.4),
            rgba(168, 85, 247, 0)
          );
        }

        /* ========================================
           COMPLETE VISUAL
        ======================================== */

        .complete-visual {
          position: relative;
          width: 175px;
          height: 90px;
        }

        .task-window {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          width: 155px;
          height: 65px;
          padding: 9px 11px;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 11px;
          background: rgba(15, 15, 17, 0.94);
          box-shadow: 0 18px 35px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(15px);
        }

        .task-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #5f626a;
          font-size: 7px;
          letter-spacing: 0.12em;
        }

        .task-status {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #6d7280;
          font-size: 6px;
        }

        .task-status span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #ff1ac6;
          box-shadow: 0 0 7px #ff1ac6;
        }

        .task-title {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 7px;
        }

        .task-title span {
          display: block;
          width: 60%;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.15);
        }

        .task-title span:last-child {
          width: 38%;
        }

        .task-progress {
          width: 100%;
          height: 3px;
          margin-top: 8px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
        }

        .task-progress div {
          width: 78%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            #ff1ac6,
            #a855f7
          );
          box-shadow: 0 0 10px rgba(255, 26, 198, 0.4);
        }

        .task-bottom {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 7px;
          color: #6b7280;
          font-size: 6px;
        }

        .task-bottom svg {
          color: #ff1ac6;
          font-size: 9px;
        }

        .completion-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(255, 26, 198, 0.1);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .ring-one {
          width: 165px;
          height: 82px;
          transform:
            translate(-50%, -50%)
            rotate(-12deg);
        }

        .ring-two {
          width: 145px;
          height: 100px;
          border-color: rgba(168, 85, 247, 0.08);
          transform:
            translate(-50%, -50%)
            rotate(25deg);
        }

        .completion-check {
          position: absolute;
          right: 1px;
          top: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border: 1px solid rgba(255, 26, 198, 0.18);
          border-radius: 50%;
          background: rgba(255, 26, 198, 0.08);
          color: #ff1ac6;
          font-size: 11px;
          box-shadow: 0 0 18px rgba(255, 26, 198, 0.15);
        }

        /* ========================================
           EARN VISUAL
        ======================================== */

        .earn-visual {
          position: relative;
          width: 175px;
          height: 90px;
        }

        .earning-box {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 9px;
          width: 160px;
          height: 65px;
          padding: 10px;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255, 26, 198, 0.14);
          border-radius: 12px;
          background: rgba(16, 16, 17, 0.95);
          box-shadow:
            0 18px 35px rgba(0, 0, 0, 0.45),
            0 0 30px rgba(255, 26, 198, 0.05);
          backdrop-filter: blur(15px);
        }

        .earning-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          border: 1px solid rgba(255, 26, 198, 0.15);
          border-radius: 10px;
          background: rgba(255, 26, 198, 0.08);
          color: #ff1ac6;
          box-shadow: 0 0 18px rgba(255, 26, 198, 0.08);
        }

        .earning-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .earning-info span {
          color: #666a74;
          font-size: 7px;
          letter-spacing: 0.14em;
        }

        .earning-info strong {
          color: white;
          font-size: 12px;
        }

        .energy-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(255, 26, 198, 0.1);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .energy-one {
          width: 175px;
          height: 85px;
          transform:
            translate(-50%, -50%)
            rotate(-12deg);
        }

        .energy-two {
          width: 145px;
          height: 65px;
          border-color: rgba(168, 85, 247, 0.09);
          transform:
            translate(-50%, -50%)
            rotate(28deg);
        }

        .energy-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .particle-one {
          top: 3px;
          left: 24px;
          background: #ff1ac6;
          box-shadow: 0 0 10px #ff1ac6;
        }

        .particle-two {
          right: 20px;
          bottom: 7px;
          background: #a855f7;
          box-shadow: 0 0 10px #a855f7;
        }

        .particle-three {
          right: 3px;
          top: 24px;
          background: white;
          box-shadow: 0 0 9px white;
        }

        .earn-shield {
          position: absolute;
          left: 1px;
          bottom: 2px;
          color: rgba(255, 26, 198, 0.55);
          font-size: 13px;
        }

        /* ========================================
           DESKTOP SCROLL REVEAL
           ONLY DESKTOP
        ======================================== */

        @media (min-width: 1024px) {
          .how-it-works-card {
            opacity: 0;
            transform: translateX(80px);
          }

          .how-it-works-visible .how-it-works-card {
            animation:
              howItWorksSlideIn
              0.8s
              cubic-bezier(0.22, 1, 0.36, 1)
              forwards;
          }

          .how-it-works-visible .how-it-works-card:nth-child(1) {
            animation-delay: 0.1s;
          }

          .how-it-works-visible .how-it-works-card:nth-child(2) {
            animation-delay: 0.3s;
          }

          .how-it-works-visible .how-it-works-card:nth-child(3) {
            animation-delay: 0.5s;
          }

          .how-it-works-visible .how-it-works-card:nth-child(4) {
            animation-delay: 0.7s;
          }
        }

        @keyframes howItWorksSlideIn {
          0% {
            opacity: 0;
            transform: translateX(80px);
          }

          65% {
            opacity: 1;
            transform: translateX(-6px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* ========================================
           TABLET
        ======================================== */

        @media (max-width: 1023px) {
          .how-it-works-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .how-it-works-card {
            opacity: 1;
            transform: none;
          }
        }

        /* ========================================
           MOBILE
        ======================================== */

        @media (max-width: 639px) {
          .how-it-works-section {
            padding: 60px 16px;
          }

          .how-it-works-header {
            margin-bottom: 35px;
          }

          .how-it-works-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .how-it-works-card {
            min-height: 350px;
          }
        }

        /* ========================================
           REDUCED MOTION
        ======================================== */

        @media (prefers-reduced-motion: reduce) {
          .how-it-works-card {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
