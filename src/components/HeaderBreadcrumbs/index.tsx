import { FC, ReactNode } from "react"
import Link from "next/link"
import Breadcrumbs from "@mui/joy/Breadcrumbs"
import Typography from "@mui/joy/Typography"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"

export interface BreadcrumbItem {
  href: string
  icon: () => ReactNode
  label: string
}
interface HeaderBreadcrumbsProps {
  extraPaths?: BreadcrumbItem[]
  text: string
}
export const HeaderBreadcrumbs: FC<HeaderBreadcrumbsProps> = ({ extraPaths, text }) => (
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

    {extraPaths && extraPaths.map(({ icon: Icon, ...item }) => (
      <Link
        key={item.label}
        color="neutral"
        href={item.href}
        aria-label={item.label}
        className="inline-flex text-xs items-center justify-center"
      >
        <Icon />
        <span className="ml-1">{item.label}</span>
      </Link>
    ))}

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