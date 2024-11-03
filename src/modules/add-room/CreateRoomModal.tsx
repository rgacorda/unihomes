"use client"

import * as React from "react"
 
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface CreateRoomModalProps {
    children : React.ReactNode; 
    trigger: React.ReactNode;
    title: string;
    description?: string;
    className?: string
}

const CreateRoomModal = ({ children, trigger, title, description, className }: CreateRoomModalProps ) => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)");
    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    { trigger }
                </DialogTrigger>
                <DialogContent className={cn("sm:max-w-[1000px] bg-secondary", className)}>
                    <DialogHeader>
                        <DialogTitle>{ title }</DialogTitle>
                        <DialogDescription>
                            { description }
                        </DialogDescription>
                    </DialogHeader>
                    {/* content here */}
                    { children }
                </DialogContent>
            </Dialog>
        );
      }
      return (
          <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>{trigger}</DrawerTrigger>
              <DrawerContent className={cn("bg-secondary", className)}>
                  <DrawerHeader className="text-left">
                      <DrawerTitle>{title}</DrawerTitle>
                      <DrawerDescription>{description}</DrawerDescription>
                  </DrawerHeader>
                  {/* content here */}
                  <div className="px-4 md:px-0">{children}</div>
                  <DrawerFooter className="pt-2">
                      <DrawerClose asChild>
                          <Button variant="outline">Close</Button>
                      </DrawerClose>
                  </DrawerFooter>
              </DrawerContent>
          </Drawer>
      );
}


export default CreateRoomModal;