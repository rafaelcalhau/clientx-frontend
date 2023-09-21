import { withAuthorization } from "@/modules/auth/withAuthorization"
import { ClientProfilePage } from "./ClientProfilePage"

export const metadata = {
  title: "ClientX - Client Profile",
  description: "Generated by create next app",
}

const PrivatePage = () => withAuthorization(ClientProfilePage)
export default PrivatePage