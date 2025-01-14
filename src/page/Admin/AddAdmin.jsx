import { Modal } from "antd";

export const AddAdmin = ({ modal2Open, setModal2Open }) => {
  return (
    <Modal
      title="Add Admin"
      centered
      open={modal2Open}
      onCancel={() => {
        setModal2Open(false);
      }}
      footer={[
        <button
          key="save"
          className="bg-[#234E6F] text-white rounded-full px-5 py-2"
        >
          Add
        </button>,
      ]}
    >
      <form>
        <div className="mt-4">
          <label htmlFor="name">
            <span className="font-semibold">First Name</span>
            <input
              className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
              type="name"
              name="name"
              id="name"
            />
          </label>
          <label htmlFor="adress">
            <span className="font-semibold">Last Name</span>
            <input
              className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
              type="adress"
              name="adress"
              id="adress"
            />
          </label>

          <label htmlFor="email">
            <span className="font-semibold">Admin Email</span>
            <input
              className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
              type="email"
              name="email"
              id="email"
            />
          </label>

          <label htmlFor="number">
            <span className="font-semibold">Contact Number</span>
            <input
              className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
              type="number"
              name="number"
              id="number"
            />
          </label>

          <label htmlFor="password">
            <span className="font-semibold">New Admin Password</span>
            <input
              className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
              type="password"
              name="password"
              id="password"
            />
          </label>
        </div>
      </form>
    </Modal>
  );
};
