import { selectUser } from "@/modules/redux-store/slices/user-data";
import { useSelector } from "react-redux";
import EditForm from "./edit-form";
import "./style.scss";

export default function Account() {
  const user = useSelector(selectUser);
  if (user.status === "fulfilled") {
    return (
      <div>
        <EditForm profile={user.value} />
      </div>
    );
  } else {
    return <div>loading..</div>;
  }
}
