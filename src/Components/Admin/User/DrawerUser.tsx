import { Button, Drawer, Image, Input } from "antd";
type PropsDrawer = {
  onCloseDrawer: () => void;
  showDrawer: () => void;
  openDrawer: boolean;
  dataUser: {
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
  showDrawer,
  openDrawer,
  dataUser,
  convertDateCol,
}: PropsDrawer) => {
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
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
              <Input defaultValue={dataUser.id} className="w-[250px]" />
            </div>
            <div className="flex flex-col ">
              <span className="mb-2">Name</span>
              <Input defaultValue={dataUser.name} className="w-[250px]" />
            </div>
          </div>
          <div className="flex mb-10">
            <div className="flex flex-col mr-5">
              <span className="mb-2">Email</span>
              <Input defaultValue={dataUser.email} className="w-[250px]" />
            </div>
            <div className="flex flex-col ">
              <span className="mb-2">Role</span>
              <Input defaultValue={dataUser.role} className="w-[250px]" />
            </div>
          </div>
          <div className="flex mb-10">
            <div className="flex flex-col mr-5">
              <span className="mb-2">Created At</span>
              <Input
                defaultValue={convertDateCol(dataUser.createdAt)}
                className="w-[250px]"
              />
            </div>
            <div className="flex flex-col ">
              <span className="mb-2">Reset Password Expire</span>
              <Input
                defaultValue={convertDateCol(dataUser.resetPasswordExpire)}
                className="w-[250px]"
              />
            </div>
          </div>
          <Image src={dataUser.url} alt="abs" width={150} height={150} />
        </div>
      </Drawer>
    </>
  );
};

export default DrawerDetailUser;
