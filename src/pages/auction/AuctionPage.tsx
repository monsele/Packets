import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OnRealAPI from "../../utils/api/onreal";
import ImageGallery from "../../components/property/ImageGallery";
import PropertyInfo from "../../components/property/PropertyInfo";
import AuctionOverview from "../../components/auction/AuctionOverview";
import BidList from "../../components/auction/BidList";
import Analytics from "../../components/auction/Analytics";
import { Auction, Property } from "../../utils/interfaces/interfaces";
import { toast } from "sonner";
import AuctionForm from "../../components/auction/AuctionForm";
import PaymasterAPI from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useReadContract } from "wagmi";
import { contractABI, contractAddress } from "../../abi/EstatePool";
const SAMPLE_PROPERTY = {
  id: "1",
  title: "Lekki Court Yard",
  location: "NO 51, ADEKOLA str Lekki way, Island Lagos",
  owner: "Danielking",
  investors: 20,
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  ],
  totalValue: 75620,
  acres: 500,
  annualYield: 20,
  timeLeft: { days: 4, hours: 4, minutes: 30 },
  bids: [
    {
      user: {
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces",
        name: "xdh...qhftuimjdf",
      },
      amount: 74000,
      isIncrease: true,
      position: "1/10",
    },
    // Add more sample bids
  ],
  analytics: {
    labels: ["year 1", "year 2", "year 3", "year 4"],
    values: [1000, 2500, 3500, 4000],
  },
};

export default function AuctionPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "analytics">(
    "overview"
  );
  const [analyticsPeriod, setAnalyticsPeriod] = useState("4");
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleAuctionSubmit = async (data: {
    auctionAmount: string;
    startingBid: string;
  }) => {
    console.log("Auction data:", data);
    // Handle auction submission
    try {
      const paymasterAPI = new PaymasterAPI();
      const onRealApi = new OnRealAPI();
      var auction = {
        tokenId: Number(id),
        amount: Number(data.auctionAmount),
        userAddress: localStorage.getItem("userWalletAddress") as string,
      };
      toast.info("Creating auction...");
      const resp = await paymasterAPI.createAuction(auction);
      var auctionData: Auction = {
        smartContractId: resp.auctionCounter,
        tokenId: Number(id),
        initialBid: data.startingBid,
        owner: localStorage.getItem("userWalletAddress") as string,
        completed: false,
        tokenAmount: data.auctionAmount,
        id: 0,
        nameOfAsset: property?.propertyTitle as string,
      };

      console.log(auctionData);
      toast.info("Creating auction...");
      var auctionResp = await onRealApi.createAuction(auctionData);
      console.log(auctionResp);
      toast.success("Auction created successfully");
      navigate(`/auctions`);
    } catch (error) {
      toast.error("Failed to create auction");
      console.error(error);
    }
  };
  console.log(id);
  const {
    data: amountOwned,
    //isLoading,
  } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    args: [
      localStorage.getItem("userWalletAddress") as `0x${string}`,
      BigInt(Number(id)),
    ],
  });
   const {
     data: userTotalVolume,
     //isLoading,
   } = useReadContract({
     address: contractAddress,
     abi: contractABI,
     functionName: "getUserTvl",
     args: [
       localStorage.getItem("userWalletAddress") as `0x${string}`],
   });
   console.log(userTotalVolume);
   
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setIsLoading(true);
        const api = new OnRealAPI();
        const propertyData = await api.getBySmartId(Number(id));
        console.log(propertyData);
        setProperty(propertyData);
      } catch (error) {
        toast.error("Failed to fetch property details");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchProperty();
    }
  }, [id]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ImageGallery images={property?.images?.split(",") ?? []} />
          <PropertyInfo
            title={property?.propertyTitle ?? ""}
            location={property?.propertyLocation ?? ""}
            owner={property?.propertyOwner ?? ""}
           // investors={property?.units ?? 0}
          />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Auction</h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "overview" ? "bg-gray-100" : ""
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "analytics" ? "bg-gray-100" : ""
                }`}
              >
                Analytics
              </button>
            </div>
            {activeTab === "overview" ? (
              <div className="space-y-6">
                <AuctionOverview
                  totalValue={SAMPLE_PROPERTY.totalValue}
                  acres={Number(amountOwned)}
                  annualYield={property?.annualYield ?? 0}
                  timeLeft={SAMPLE_PROPERTY.timeLeft}
                />
                <AuctionForm onSubmit={handleAuctionSubmit} />
              </div>
            ) : (
              <Analytics
                data={SAMPLE_PROPERTY.analytics}
                period={analyticsPeriod}
                onPeriodChange={setAnalyticsPeriod}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
