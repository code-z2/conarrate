import React from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react"
import { Link } from "react-router";
 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Login() {
  return (
    <div className="">
      <div className="w-sceen p-5 border-b-2 border-[#999999] ">
        <h1 className="text-[24px] font-head text-[#51016D]">Conarrative</h1>
      </div>
      <div className="flex justify-center items-center h-screen gap-10">
        <div className="w-[479px]">
          <div className="my-7">
            <h1 className="text-2xl font-semibold">Let's Get Started!</h1>
            <p>Connect your wallet to get started</p>
          </div>
          <div className="flex flex-col gap-1 mb-10">
          <Dialog>
      <DialogTrigger asChild>
      <Button variant="outline">
              <img
                src="/icons/Metamask-Icon--Streamline-Svg-Logos.svg"
                alt=""
              />{" "}
              Metamask
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ETH Wallet Address</DialogTitle>
          <DialogDescription>
            Please enter your ETH wallet Address
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" >
              <Link to="/home">
              Sign In
              </Link>
              
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>


            {/* <Button variant="outline">
              <img
                src="/icons/Metamask-Icon--Streamline-Svg-Logos.svg"
                alt=""
              />{" "}
              Metamask
            </Button> */}
            <Button variant="outline">
              <img src="/icons/Vector (3).svg" alt="" />
              Argent
            </Button>
            <Button variant="outline">
              <img src="/icons/token-branded_wallet-connect.svg" alt="" />{" "}
              Wallet Connect
            </Button>
          </div>
          <div className="group-3 flex justify-center gap-5 items-center mb-10">
            <p>Or sign in with</p>
            <span className="w-80 border-t border-black"> </span>
          </div>
          <div className="flex gap-5 ">
            <Button variant="outline" className="w-[235px]">
              <img src="/icons/Google-Icon--Streamline-Svg-Logos.svg" alt="" />{" "}
              Google
            </Button>
            <Button variant="outline" className="w-[235px]">
              <img src="/icons/Apple--Streamline-Svg-Logos.svg" alt="" /> Apple
            </Button>
          </div>
        </div>
        <div className="w-[510px]">
          <img src="/images/Frame 427319721.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
