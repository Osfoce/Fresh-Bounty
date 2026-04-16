import { useState } from "react";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import { supportedChains } from "../rainbowChains";
import { useSwitchChain } from "wagmi";
import { Link } from "react-router-dom";

function Create() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState("INJ");

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const [multipleWinner, setMultipleWinner] = useState(false);

  //  switching chain
  const { switchChain } = useSwitchChain();

  const handleChange = (e) => {
    const chainId = Number(e.target.value);
    switchChain({ chainId });
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-black text-white">
      <NavBar />

      {/* STEP INDICATOR */}
      <div className="py-[5em] flex justify-between items-center gap-2 px-10 mt-10">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col gap-1">
            <div
              className={`py-1 w-[10vw] rounded-full ${
                step <= currentStep ? "bg-pink-500" : "bg-gray-800"
              }`}
            />
            <p className="text-xs text-gray-400">Step {step}</p>
            <h6 className="text-xs">
              {step === 1 && "Select Network"}
              {step === 2 && "Task Details"}
              {step === 3 && "Reward Info"}
              {step === 4 && "Review"}
            </h6>
          </div>
        ))}
      </div>

      {/* ================= PAGE 1 ================= */}
      {currentStep === 1 && (
        <div className="md:flex md:justify-center">
        <div className="bg-[#2D2D2D] border border-white rounded-lg py-4 m-10 md:w-[70vw]">
          <p className="px-4 text-sm">Step 1 of 4</p>

          <h2 className="px-4 text-xl font-semibold">Choose Network</h2>

          <div className="px-4 mt-4 flex flex-col gap-4">
            <select
              onChange={handleChange}
              className="border border-white bg-[#1c1c1c] h-[40px] rounded-lg px-2 md:w-[25vw]"
            >
              {/* Switch to selected chain  */}
              <option value="">Select Network</option>
              {supportedChains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name}
                </option>
              ))}
            </select>

            <select className="border border-white bg-[#1c1c1c] h-[40px] rounded-lg px-2 md:w-[25vw]">
              <option>Development</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Others</option>
            </select>
          </div>
        </div>
        </div>
      )}

      {/* ================= PAGE 2 ================= */}
      {currentStep === 2 && (
<div className="md:flex md:justify-center">
        <div className="bg-[#2D2D2D] border border-white rounded-lg py-4 m-10 md:w-[70vw]">
          <p className="px-4 text-sm">Step 2 of 4</p>

          <h2 className="px-4 text-xl font-semibold">Task Details</h2>

          <div className="px-4 mt-4 flex flex-col gap-4">
            <input
              className="h-[40px] bg-[#1c1c1c] border border-white px-3 rounded-lg md:w-[50vw]"
              placeholder="Title"
            />

            <textarea
              className="h-40 bg-[#1c1c1c] border border-white p-3 rounded-lg overflow-y-auto resize-none md:w-[50vw]"
              placeholder="Description"
            />

            <div className="flex flex-col md:flex-row gap-4">
              <label className="text-xs text-gray-400 md:hidden">Start Date</label>

  <input
    type="date"
    className="h-[40px] bg-[#1c1c1c] border border-white px-2 rounded-lg"
  />

              <label className="text-xs text-gray-400 md:hidden">End Date</label>

              <input
                type="date"
                className="h-[40px]  bg-[#1c1c1c] border border-white px-2 rounded-lg"
              />
            </div>

            <input
              className="h-[40px] bg-[#1c1c1c] border border-white px-3 rounded-lg md:w-[50vw]"
              placeholder="Origin link"
            />
          </div>
        </div>
        </div>
      )}

      {/* ================= PAGE 3 ================= */}
      {currentStep === 3 && (
        <div
          id="page3"
          className="bg-[#2D2D2D] border border-white rounded-lg h-auto py-4 m-10 mt-10"
        >
          <p className="py-2 px-4 text-white text-sm">Step 3 of 4</p>

          <h2 className="px-4 text-white text-xl font-semibold">
            Reward information
          </h2>

          <p className="text-xs text-white px-4">
            When creating a new task, you have two options regarding the reward:
          </p>

          <p className="text-xs text-white px-4 mt-4">
            1. Self-fund: You use your own money to create the task. This means
            you will be responsible for providing the reward money that will be
            given to the person who successfully completes the task.
          </p>

          <p className="text-xs text-white px-4 mt-4">
            2. Self-fund: You use your own money to create the task. This means
            you will be responsible for providing the reward money that will be
            given to the person who successfully completes the task.
          </p>

          <div className="flex flex-col justify-center gap-4 mt-8 m-4">
            <div>
              {/* Toggle Switch */}
              <div className="flex flex-row items-center gap-2">
                <h3 className="text-white text-md">Multiple winner</h3>

                <div className="flex flex-row items-center gap-2">
                  {/* Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={multipleWinner}
                      onChange={() => setMultipleWinner(!multipleWinner)}
                    />

                    <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-[#FF1AC69E] transition-all"></div>

                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-all"></div>
                  </label>
                </div>
              </div>

              {/* Dropdown */}
              {multipleWinner && (
                <div className="bg-[#2D2D2D] border border-white rounded-lg w-fit p-2 flex gap-2 flex-row items-center mt-3">
                  <button className="border border-white rounded-lg py-1 px-3 text-white text-sm hover:bg-[#FF1AC69E]">
                    Equal Split
                  </button>

                  <button
                    id="percentBtn"
                    className="border border-white rounded-lg w-fit h-auto py-1 px-2 text-white text-[11px] md:text-sm hover:bg-[#FF1AC69E]"
                  >
                    % Split
                  </button>
                </div>
              )}

              {/* INFO BUTTON */}
              <button id="infom" className="relative">
                <i className="bi bi-info-circle text-white text-sm"></i>

                <div className="relative">
                  {/* INFO MENU */}
                  <div
                    id="infomenu"
                    className="absolute bg-white border border-[#2D2D2D] left-[-190%] md:left-[5%] w-[60vw] max-w-[380px] md:w-[24vw] h-auto top-2 z-50 rounded-lg hidden text-start px-3 py-2 break-words left-1/2 -translate-x-1/2"
                  >
                    <p className="text-xs text-black mt-2">
                      For equal split; Reward is split equally among winners.
                    </p>

                    <p className="text-xs text-black mt-2">
                      For % split: Reward is distributed according to custom
                      percentages.
                    </p>

                    <div className="mt-2 flex flex-col gap-1">
                      <p className="text-xs text-black font-semibold">
                        Supported configurations:
                      </p>

                      <div className="text-xs flex flex-col gap-1">
                        <span>[40, 30, 20, 5, 5]</span>
                        <span>[40, 30, 20, 10]</span>
                        <span>[50, 30, 20]</span>
                        <span>[50, 50]</span>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-col gap-1">
                      <p className="text-xs text-black font-semibold">Rules:</p>

                      <ul className="text-xs text-black list-disc pl-5 space-y-1">
                        <li>Minimum winners: 2</li>
                        <li>Maximum winners: 5</li>
                        <li>Percentages must sum to 100</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* EQUAL SPLIT MODAL */}
            <div
              id="equalModal"
              className="fixed inset-0 bg-black/70 flex items-center justify-center hidden z-50"
            >
              <div className="bg-[#2D2D2D] border border-white rounded-lg w-[90%] max-w-[350px] p-6 flex flex-col gap-4 text-white">
                <h3 className="text-md font-semibold">Equal Split</h3>

                <p className="text-xs text-gray-300">
                  Enter the number of winners. Maximum winners allowed is 5.
                </p>

                <input
                  id="equalWinnersInput"
                  min="2"
                  max="5"
                  placeholder="Number of winners"
                  className="border border-white bg-[#1c1c1c] rounded-lg px-3 h-[40px] text-white"
                />

                <button
                  id="closeEqual"
                  className="border border-white rounded-lg py-2 text-sm hover:bg-white hover:text-black transition"
                >
                  Confirm
                </button>
              </div>
            </div>

            {/* PERCENTAGE SPLIT MODAL */}
            <div
              id="percentModal"
              className="fixed inset-0 bg-black/70 flex items-center justify-center hidden z-50"
            >
              <div className="bg-[#2D2D2D] border border-white rounded-lg w-[90%] max-w-[420px] p-6 flex flex-col gap-4 text-white">
                <h3 className="text-md font-semibold">% Split</h3>

                <div className="flex flex-col gap-2">
                  <button
                    className="preset-btn border border-white rounded-lg px-3 py-2 text-sm"
                    data-value="[40,30,20,5,5]"
                  >
                    [40, 30, 20, 5, 5]
                  </button>

                  <button
                    className="preset-btn border border-white rounded-lg px-3 py-2 text-sm"
                    data-value="[40,30,20,10]"
                  >
                    [40, 30, 20, 10]
                  </button>

                  <button
                    className="preset-btn border border-white rounded-lg px-3 py-2 text-sm"
                    data-value="[50,30,20]"
                  >
                    [50, 30, 20]
                  </button>

                  <button
                    className="preset-btn border border-white rounded-lg px-3 py-2 text-sm"
                    data-value="[50,50]"
                  >
                    [50, 50]
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-300">Custom percentages</p>

                  <input
                    type="text"
                    id="percentWinnersInput"
                    placeholder="Number of winners"
                    className="border border-white bg-[#1c1c1c] rounded-lg px-3 h-[40px] text-white"
                  />
                </div>

                <button
                  id="closePercent"
                  className="border border-white rounded-lg py-2 text-sm hover:bg-white hover:text-black transition"
                >
                  Confirm
                </button>
              </div>
            </div>

            {/* REWARD TYPE */}
            <div>
              <h3 className="text-white text-sm flex items-center gap-1">
                Reward Type <span className="text-red-900 mt-1 text-xs">*</span>
              </h3>

              <div className="flex flex-row gap-2 items-center text-white text-[11px] md:text-xs mt-2">
                <button className="hover:bg-[#FF1AC69E] border border-white rounded-lg bg-[#2D2D2D] px-2 py-1">
                  Self-Fund
                </button>

                <button className="border border-white rounded-lg bg-[#2D2D2D] px-2 py-1">
                  Seek Funding{" "}
                  <span className="text-[11px] text-red-900">soon</span>
                </button>
              </div>
            </div>

            {/* TOKEN */}
            <div className="text-white mt-2">
              <p className="text-sm">Select Token</p>

              <select
                id="network1"
                className="border border-white w-[60%] md:w-[25vw] h-[40px] bg-[#1c1c1c] rounded-lg px-2 text-white"
              >
                <option value="INJ">select token</option>
                <option className="text-md" value="USDC">
                  USDC
                </option>
                <option className="text-md" value="USDT">
                  USDT
                </option>
                <option className="text-md" value="ETH">
                  ETH
                </option>
                <option className="text-md" value="INJ">
                  Injective
                </option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE 4 ================= */}
      {currentStep === 4 && (
        <div className="bg-[#2D2D2D] border border-white rounded-lg py-4 m-10">
          <p className="px-4 text-sm">Step 4 of 4</p>

          <h2 className="px-4 text-xl font-semibold">Review</h2>

          <p className="px-4 mt-4 text-xs">
            Review everything before submitting.
          </p>
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex justify-center py-6">
        <div className="flex gap-6">
          {currentStep === 1 ? (
            <Link
              to="/dashboard"
              className="border border-white px-4 py-2 rounded-lg inline-block"
            >
              Back
            </Link>
          ) : (
            <button
              onClick={prevStep}
              className="border border-white px-4 py-2 rounded-lg"
            >
              Back
            </button>
          )}

          <button
            onClick={nextStep}
            className="border border-white px-4 py-2 rounded-lg bg-pink-500"
          >
            {currentStep === 4 ? "Create Task" : "Next"}
          </button>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Create;
