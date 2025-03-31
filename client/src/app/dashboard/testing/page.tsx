import React from "react";
import MainDashBoard from "../components/MainDashBoardSection/MainSection";
import AccountVerification from "@/app/components/ui/AccountVerification";

export default function page () {
    return(
        <>
            <AccountVerification />
            <MainDashBoard />
        </>
    )
}