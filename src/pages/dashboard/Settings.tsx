import { useEffect, useState } from "react";
import {
  Wallet,
  CreditCard,
  Building2,
  Copy,
  Check,
  X,
  RefreshCw,
} from "lucide-react";
import PaymasterAPI from "../../utils/api";
import { MintCurr } from "../../utils/interfaces/interfaces";
import { EstatePoolView } from "../../utils/smartContract";

interface PaymentMethod {
  type: "card" | "transfer";
  details: {
    cardNumber?: string;
    bankName?: string;
    accountNumber?: string;
    reference?: string;
  };
}

export default function Settings() {
  const [balance, setBalance] = useState(0);
  const [showFundWallet, setShowFundWallet] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">(
    "card"
  );
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userBal = await EstatePoolView.getUserBalance(
        "NGN",
        localStorage.getItem("userWalletAddress") as `0x${string}`
      );
      console.log(userBal);
      setBalance(Number(userBal));
    };

    fetchData();
  }, [balance]);

  // Sample bank transfer details
  const transferDetails = {
    bankName: "Sample Bank",
    accountNumber: "0123456789",
    reference:
      "REF" + Math.random().toString(36).substring(2, 10).toUpperCase(),
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formattedValue.substring(0, 19)); // 16 digits + 3 spaces
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 2) {
      const month = parseInt(value.substring(0, 2));
      if (month > 12) {
        value = "12" + value.substring(2);
      }
      value =
        value.substring(0, 2) +
        (value.length > 2 ? "/" + value.substring(2) : "");
    }

    setExpiryDate(value.substring(0, 5)); // MM/YY format
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value.substring(0, 3));
  };

  const handleFundWallet = async () => {
    setLoading(true);
    try {
      // Simulate API call
      const paymasterApi = new PaymasterAPI();
      const input: MintCurr = {
        shortForm: "NGN",
        amount: Number(amount),
        user: localStorage.getItem("userWalletAddress") as string,
      };
      console.log(input);

      var resp = await paymasterApi.mintCurrency(input);
      console.log(resp);

      setBalance((prev) => prev + Number(amount));
      setShowFundWallet(false);
      setAmount("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
    } catch (error) {
      console.error("Failed to fund wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wallet Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Wallet Balance</h3>
            </div>
            <button
              onClick={() => setShowFundWallet(true)}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Fund Wallet
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">Available Balance</p>
            <p className="text-3xl font-semibold">
              ₦{balance.toLocaleString()}
            </p>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Recent Transactions</h4>
              <button className="text-blue-600 flex items-center gap-1">
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
            {balance === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No transactions yet
              </p>
            ) : (
              <div className="space-y-3">
                {/* Add transaction items here */}
              </div>
            )}
          </div>
        </div>

        {/* Fund Wallet Modal */}
        {showFundWallet && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Fund Wallet</h3>
                <button
                  onClick={() => setShowFundWallet(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (NGN)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`flex items-center gap-2 p-3 rounded-lg border ${
                        paymentMethod === "card"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <CreditCard size={20} />
                      <span>Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("transfer")}
                      className={`flex items-center gap-2 p-3 rounded-lg border ${
                        paymentMethod === "transfer"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Building2 size={20} />
                      <span>Transfer</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === "transfer" ? (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Bank Name</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {transferDetails.bankName}
                        </span>
                        <button
                          onClick={() =>
                            handleCopy(transferDetails.bankName, "bank")
                          }
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {copied === "bank" ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Account Number</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {transferDetails.accountNumber}
                        </span>
                        <button
                          onClick={() =>
                            handleCopy(transferDetails.accountNumber, "account")
                          }
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {copied === "account" ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Reference</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {transferDetails.reference}
                        </span>
                        <button
                          onClick={() =>
                            handleCopy(transferDetails.reference, "reference")
                          }
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {copied === "reference" ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={handleCvvChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleFundWallet}
                  disabled={!amount || loading}
                  className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <RefreshCw size={16} className="animate-spin" />}
                  {loading ? "Processing..." : "Proceed"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
