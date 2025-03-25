
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center justify-center gap-2", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  
  // Ensure inputOTPContext and slots exist before accessing them
  if (!inputOTPContext || !inputOTPContext.slots || !inputOTPContext.slots[index]) {
    // Return a placeholder div if the context or slot is not available
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-12 w-10 items-center justify-center backdrop-blur-md bg-black/30 border border-cyan-800/50 text-lg transition-all first:rounded-l-md first:border-l last:rounded-r-md shadow-[0_0_10px_rgba(0,255,204,0.2)]",
          className
        )}
        {...props}
      />
    )
  }
  
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-12 w-10 items-center justify-center backdrop-blur-md bg-black/30 border border-cyan-800/50 text-lg transition-all first:rounded-l-md first:border-l last:rounded-r-md shadow-[0_0_10px_rgba(0,255,204,0.2)]",
        isActive && "z-10 ring-2 ring-cyan-500/70 ring-offset-background",
        className
      )}
      {...props}
    >
      {/* Holographic glow effect when active */}
      {isActive && (
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-md blur-sm" />
      )}
      
      {/* Character display */}
      <div className="relative z-10 text-cyan-50 font-mono">
        {char}
      </div>
      
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-cyan-400 duration-1000" />
        </div>
      )}
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot className="text-cyan-500" />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
