"use client"

import React from "react";
import Link from "next/link"
import Breadcrumbs from "@mui/joy/Breadcrumbs"
import Typography from "@mui/joy/Typography"
import { PrivatePageContainer } from "@/components/PrivatePageContainer";

// Icons
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'

const DashboardBreadcrumbs = () => (
  <Breadcrumbs
    size="sm"
    aria-label="breadcrumbs"
    separator={<ChevronRightRoundedIcon sx={{ fontSize: 12 }} />}
  >
    <Link
      color="neutral"
      href="#some-link"
      aria-label="Home"
      className="inline-flex text-xs items-center justify-center"
    >
      <HomeRoundedIcon fontSize="small" className="mr-1" />
      <span>Dashboard</span>
    </Link>
    <Typography color="primary" fontWeight={500} fontSize={12}>
      Clients
    </Typography>
  </Breadcrumbs>
)

export function DashboardPage () {
  return (
    <PrivatePageContainer
      breadcrumbs={<DashboardBreadcrumbs />}
      heading="Dashboard Page"
    >
      <div />
    </PrivatePageContainer>
  )
}
