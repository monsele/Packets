import { useParams } from "react-router-dom";
import ImageGallery from "../../components/property/ImageGallery";
import PropertyInfo from "../../components/property/PropertyInfo";
import PurchaseCard from "../../components/property/PurchaseCard";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  BuyPlotRequest,
  PaymasterResponse,
  PropertyType,
} from "../../utils/interfaces/interfaces";
import { useAccount } from "wagmi";
import OnRealAPI from "../../utils/api/onreal";
import PaymasterAPI from "../../utils/api";
import { toast } from "sonner";

// This would typically come from an API
const SAMPLE_PROPERTY = {
  id: "1",
  title: "Lekki Court Yard",
  location: "W041, ADEOLA HOPEWELL, Island Lagos",
  owner: "Danielking",
  investors: 200,
  images: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  ],
  totalValue: 75620,
  totalUnits: 500,
  unitValue: 620,
  annualYield: 20,
};

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isConnected, address } = useAccount();
  const { data, isLoading } = useQuery({
    queryKey: ["getPropertyBySmartId"],
    queryFn: async () => {
      const onRealApi = new OnRealAPI();
      const data = await onRealApi.getPropertyById(Number(id));
      return data as PropertyType;
    },
  });
  const handlePurchase = async (units: number) => {
    const paymasterAPI = new PaymasterAPI();
    const toastId = toast("Sonner");
    if (!isConnected || !address) {
      toast.error("Wallet not connected", {
        id: toastId,
      });
      console.error("Wallet not connected");
      return;
    }
    console.log("Purchasing units:", units);
    const purchaseDetails: BuyPlotRequest = {
      tokenId: data?.smartContractId || 0,
      purchaseAmt: units,
      payAmount: units * (data?.price ?? 0),
      userAddress: address,
      currencyCode: "NGN",
    };
    toast.info("Purchasing property...", {
      id: toastId,
    });
    const response = (await paymasterAPI.buyPlot(
      purchaseDetails
    )) as PaymasterResponse;
    console.log(response);
    if (response.success) {
      toast.success("Property purchased successfully!", {
        id: toastId,
      });
      navigate("/dashboard");
    } else {
      toast.error("Failed to purchase property", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ImageGallery images={data?.images ? data.images.split(",") : []} />
        </div>

        <div className="space-y-8">
          <PropertyInfo
            title={data?.propertyTitle || ""}
            location={data?.propertyLocation || ""}
            owner={data?.propertyOwner || ""}
            investors={SAMPLE_PROPERTY.investors}
          />

          <PurchaseCard
            totalValue={data?.units || 0}
            totalUnits={data?.units || 0}
            unitValue={data?.price || 0}
            annualYield={data?.annualYield || 0}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
}
