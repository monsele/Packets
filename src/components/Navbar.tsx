import {
  Search,
  Home,
  LogOut,
  LogIn,
  Settings,
  LayoutDashboard,
  GridIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { baseSepolia } from "viem/chains";
import { toast } from "sonner";
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-blue-600 text-2xl font-bold flex items-center"
          >
            {/* <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded mr-2">
              <span className="transform -rotate-45">⬚</span>
            </div> */}
            Packets
          </Link>
          {localStorage.getItem("userWalletAddress") && (
            <div className="relative">
              <Link
                to="/dashboard"
                className="appearance-none bg-transparent border border-gray-300 rounded-lg px-4 py-2 pr-8"
              >
                <LayoutDashboard className="inline" size={28} />
              </Link>
            </div>
          )}

          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for properties"
              className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/upload">
            <button className="px-4 py-2 font-medium">List properties</button>
          </Link>
          <Link to="/auctions">
            <button className="px-4 py-2 font-medium">Auctions</button>
          </Link>
          {isConnected && (
            <>
              <button className="relative">
                {/* <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  2
                </span> */}
              </button>
              {/* <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              /> */}
              {address && address.slice(0, 6) + "..." + address.slice(-4)}
            </>
          )}
          <button
            onClick={toggleAuth}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-[#040404] hover:bg-[#040404]/90 transition-colors"
          >
            {isConnected ? (
              <>
                <LogOut className="w-5 h-5" />
                <span
                  onClick={async () => {
                    try {
                      await disconnectAsync();
                      localStorage.removeItem("userWalletAddress");
                      //return toast.success(`Logged Out`);
                    } catch (error) {
                      console.log({ error });
                    }
                  }}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span
                  onClick={async () => {
                    try {
                      const connectResp = await connectAsync({
                        chainId: baseSepolia.id,
                        connector: injected(),
                      });
                      localStorage.setItem(
                        "userWalletAddress",
                        connectResp.accounts[0]
                      );
                      toast.success(`Logged In`);
                    } catch (error) {
                      console.log({ error });
                    }
                  }}
                >
                  Login
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
