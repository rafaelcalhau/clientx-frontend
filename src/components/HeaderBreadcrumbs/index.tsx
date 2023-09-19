import { FC } from "react"
import Link from "next/link"
import Breadcrumbs from "@mui/joy/Breadcrumbs"
import Typography from "@mui/joy/Typography"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"

interface HeaderBreadcrumbsProps {
  text: string
}
export const HeaderBreadcrumbs: FC<HeaderBreadcrumbsProps> = ({ text }) => (
  <Breadcrumbs
    size="sm"
    aria-label="breadcrumbs"
    data-testid="breadcrumb-container"
    separator={<ChevronRightRoundedIcon sx={{ fontSize: 12 }} />}
  >
    <Link
      color="neutral"
      href="/dashboard"
      aria-label="Home"
      className="inline-flex text-xs items-center justify-center"
    >
      <HomeRoundedIcon />
      <span className="ml-1">Dashboard</span>
    </Link>

    <Typography
      color="primary"
      data-testid="breadcrumb-current-item"
      fontWeight={500}
      fontSize={12}
    >
      {text}
    </Typography>
  </Breadcrumbs>
)