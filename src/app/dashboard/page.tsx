import { withAuthorization } from "@/modules/auth/withAuthorization"
import { DashboardPage } from "./DashboardPage"

const PrivatePage = () => withAuthorization(DashboardPage)
export default PrivatePage
