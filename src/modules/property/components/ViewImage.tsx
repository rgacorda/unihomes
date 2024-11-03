import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";

const ViewImage = ({ children, className, trigger } : { children: React.ReactNode, trigger: React.ReactNode ,className?: string } ) => {
  return (
      <div className={className}>
          <Sheet>
              <SheetTrigger>{trigger}</SheetTrigger>
              <SheetContent
                  side={"bottom"}
                  className="h-screen flex justify-center items-center"
              >
                  <div>{children}</div>
              </SheetContent>

          </Sheet>
      </div>
  );
}

export default ViewImage