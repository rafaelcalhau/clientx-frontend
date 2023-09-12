import { withAuthorization } from "@/shared/withAuthorization"
import { DashboardPage } from "./DashboardPage"

const PrivatePage = () => withAuthorization(DashboardPage)
export default PrivatePage
