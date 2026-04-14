import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

function Connect() {
  return (
    <ConnectButton
      accountStatus={{
        smallScreen: "avatar",
        largeScreen: "full",
      }}
      showBalance={{
        smallScreen: false,
        largeScreen: true,
      }}
    />
  );
}
export default Connect;
