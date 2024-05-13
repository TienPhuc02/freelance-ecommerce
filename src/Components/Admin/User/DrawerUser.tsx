import { Button, Drawer } from "antd";
type PropsDrawer = {
  onCloseDrawer: () => void;
  showDrawer: () => void;
  openDrawer: boolean;
};
const DrawerDetailUser = ({
  onCloseDrawer,
  showDrawer,
  openDrawer,
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default DrawerDetailUser;
