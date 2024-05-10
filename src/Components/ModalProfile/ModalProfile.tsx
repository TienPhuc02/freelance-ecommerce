import { Modal, Tabs, TabsProps } from "antd";
import InfoProfile from "./TabInforProfile";
import TabUpdateProfile from "./TabUpdateProfile";
import TabUploadAvatar from "./TabUploadAvavtar";

type PropsModalProfile = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};
const ModalProfile = ({
  isModalOpen,
  handleCancel,
  handleOk,
}: PropsModalProfile) => {
  const onChangeTab = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Info Profile",
      children: <InfoProfile />,
    },
    {
      key: "2",
      label: "Update Profile",
      children: <TabUpdateProfile handleCancel={handleCancel} />,
    },
    {
      key: "3",
      label: "Upload Avatar",
      children: <TabUploadAvatar handleCancel={handleCancel}/>,
    },
    {
      key: "4",
      label: "Tab 4",
      children: "Content of Tab Pane 4",
    },
  ];
  return (
    <div>
      <Modal
        title="Profile User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#167fff" } }}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
      </Modal>
    </div>
  );
};
export default ModalProfile;
