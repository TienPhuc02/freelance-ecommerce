import { Drawer, Image, Input } from "antd";
type PropsDrawer = {
  onCloseDrawer: () => void;
  openDrawer: boolean;
  dataUserView: {
    id: string;
    name: string;
    email: string;
    role: string;
    url: string;
    createdAt: string;
    resetPasswordExpire: string;
  };
  convertDateCol: (dateInput: string) => string;
};
const DrawerDetailUser = ({
  onCloseDrawer,
  openDrawer,
  dataUserView,
  convertDateCol,
}: PropsDrawer) => {
  return (
    <>
      <Drawer
        title="Basic Drawer"
        width={600}
        onClose={onCloseDrawer}
        open={openDrawer}
      >
        <div className="flex flex-col">
          <div className="flex mb-10">
            <div className="flex flex-col mr-5">
              <span className="mb-2">Id</span>
              <Input defaultValue={dataUserView.id} className="w-[250px]" />
            </div>
            <div className="flex flex-col ">
              <span className="mb-2">Name</span>
              <Input defaultValue={dataUserView.name} className="w-[250px]" />
            </div>
          </div>
          <div className="flex mb-10">
            <div className="flex flex-col mr-5">
              <span className="mb-2">Email</span>
              <Input defaultValue={dataUserView.email} className="w-[250px]" />
            </div>
            <div className="flex flex-col ">
              <span className="mb-2">Role</span>
              <Input defaultValue={dataUserView.role} className="w-[250px]" />
            </div>
          </div>
          <div className="flex mb-10">
            <div className="flex flex-col mr-5">
              <span className="mb-2">Created At</span>
              <Input
                defaultValue={convertDateCol(dataUserView.createdAt)}
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col ">
              <span className="mb-2">Reset Password Expire</span>
              <Input
                defaultValue={convertDateCol(dataUserView.resetPasswordExpire)}
                className="w-[250px]"
              />
            </div>
          </div>
          {dataUserView.url !== "" ? (
            <Image
              width={150}
              height={150}
              src={`${dataUserView.url}`}
              alt="avatar user"
            />
          ) : (
            "avatar user"
          )}
        </div>
      </Drawer>
    </>
  );
};

export default DrawerDetailUser;