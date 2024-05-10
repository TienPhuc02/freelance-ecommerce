
import { Avatar } from "antd";
import { useSelector } from "react-redux";

const InfoProfile = () => {
  const user = useSelector((state: any) => state?.account);
  console.log("check modal user", user);
  return (
    <div className="flex info-profile container gap-3">
      <Avatar size={200} icon={<img src={`${user.avatar.url}`} />} />
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-xl">Full Name: </p>
        <span>{user.name}</span>
        <p className="font-semibold text-xl">Email Address: </p>
        <span>{user.email}</span>
        <p className="font-semibold text-xl">Role: </p>
        <span>{user.role}</span>
      </div>
    </div>
  );
};
export default InfoProfile;
