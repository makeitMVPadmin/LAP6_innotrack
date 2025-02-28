import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const CustomDialog = DialogPrimitive.Root;

const CustomDialogTrigger = DialogPrimitive.Trigger;

const CustomDialogPortal = DialogPrimitive.Portal;

const CustomDialogOverlay = React.forwardRef(
    ({ className, showOverlay = true, ...props }, ref) => (
        <DialogPrimitive.Overlay
            ref={ref}
            className={cn(
                "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                className,
                {
                    "bg-black/50": showOverlay, //only change from /80 to /50
                }
            )}
            {...props}
        />
    )
);
CustomDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const defaultOpenAnimation =
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]";
const defaultCloseAnimation =
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]";

const CustomDialogContent = React.forwardRef(
    (
        {
            className,
            showOverlay = true,
            animateOpen = "",
            animateClose = "",
            children,
            ...props
        },
        ref
    ) => (
        <CustomDialogPortal>
            <CustomDialogOverlay showOverlay={showOverlay} />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(
                    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg duration-200",
                    className,
                    animateOpen
                        ? `data-[state=open]:${animateOpen}`
                        : defaultOpenAnimation,
                    animateClose
                        ? `data-[state=closed]:${animateClose}`
                        : defaultCloseAnimation
                )}
                {...props}
            >
                {children}
            </DialogPrimitive.Content>
        </CustomDialogPortal>
    )
);
CustomDialogContent.displayName = DialogPrimitive.Content.displayName;

export { CustomDialog, CustomDialogTrigger, CustomDialogContent };
