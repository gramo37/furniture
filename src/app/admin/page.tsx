import AdminMainpage from "@/components/admin/AdminMainPage";
import { getSiteData } from "@/components/utils";

export default function Admin() {
  const [data] = getSiteData();

  return <AdminMainpage data={data} />;
}
