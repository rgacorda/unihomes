import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
  import { DollarSign, MapPin } from "lucide-react";


function ListingCard() {
  return (
      <Card
        className="w-full max-w-max bg-transparent border-none"
        onClick={() => {
          window.location.href = "/property/room";
        }}
      >
          <CardHeader className="flex flex-row gap-3 md:gap-0 md:flex-col  p-0 m-0">
              <div>
                  <img
                      src="https://placehold.co/300x200"
                      alt="property image"
                      className="rounded-xl"
                  />
              </div>
              <div>
                  <CardTitle className="flex flex-row items-center">
                      <DollarSign className="w-7 h-auto px-0" />
                      <span className="prose-2xl">999 999</span>
                  </CardTitle>
                  <div className="flex items-center gap-1">
                      <MapPin className="w-[18px] h-auto px-0" />
                      <span>15 S Aurora Ave, Miami</span>
                  </div>
                  <CardDescription>
                      <span>2 bedrooms • 3 rooms • 1220 Sq. ft.</span>
                  </CardDescription>
              </div>
          </CardHeader>
      </Card>
  );
}

export default ListingCard