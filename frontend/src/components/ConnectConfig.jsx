import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

function ConnectConfig() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready =
          mounted && authenticationStatus !== "loading";

        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {!connected ? (
              <button
                type="button"
                onClick={openConnectModal}
                className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Connect Wallet
              </button>
            ) : chain.unsupported ? (
              <button
                type="button"
                onClick={openChainModal}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
              >
                Wrong network
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={openChainModal}
                  className="flex-1 bg-white/10 px-3 py-2 rounded-lg"
                >
                  {chain.hasIcon && (
                    <img
                      alt={chain.name ?? "Chain icon"}
                      src={chain.iconUrl}
                      className="inline-block w-4 h-4 mr-2 rounded-full"
                    />
                  )}

                  {chain.name}
                </button>

                <button
                  type="button"
                  onClick={openAccountModal}
                  className="flex-1 bg-white/10 px-3 py-2 rounded-lg"
                >
                  {account.displayName}

                  {account.displayBalance
                    ? ` (${account.displayBalance})`
                    : ""}
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default ConnectConfig;