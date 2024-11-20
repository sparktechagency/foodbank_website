import { Modal } from "antd";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const FAQ = () => {

  
  const [open, setOpen] = useState(false); // State for adding FAQ
  const [editOpen, setEditOpen] = useState(false); // State for editing FAQ
  const [currentFAQ, setCurrentFAQ] = useState(null); // State for Add FAQ modal

  const faq = [
    {
      id: 1,
      title: "What is an affiliate e-commerce website?",
      ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
    },
    {
      id: 2,
      title: "What is an affiliate e-commerce website?",
      ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
    },
    {
      id: 3,
      title: "What is an affiliate e-commerce website?",
      ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
    },
  ];

 // Open Edit Modal with selected FAQ
 const openEditModal = (faqItem) => {
    setCurrentFAQ(faqItem);
    setEditOpen(true);
  };

  // Close both modals
  const closeModal = () => {
    setOpen(false);
    setEditOpen(false);
    setCurrentFAQ(null);
  };

  return (
    <div>
      <div className="flex justify-end">
        {/* Button to trigger the Add FAQ modal */}
        <button
          onClick={() => setOpen(true)}
          className="bg-[#02111E] py-2 px-3 rounded text-white"
        >
          + Add FAQ
        </button>
      </div>

      <div className="mt-20">
        {faq.map((item) => (
          <div key={item.id} className="mt-6 flex">
            <div>
              <div className="bg-[#272121] p-1 rounded-md text-white flex justify-between">
                <div className="">
                  Q: {item.title}
                </div>
                {/* Edit button to open the Edit FAQ modal */}
                <div onClick={() => openEditModal(item)} className="text-[#555555] text-2xl pr-4">
                  <RiEdit2Fill />
                </div>
              </div>
              <div className="mt-3 bg-[#BCBABA26] p-3 rounded-md shadow">
                {item.ans}
              </div>
            </div>
            {/* Delete icon */}
            <div className="text-2xl mt-1">
              <RxCross2 />
            </div>
          </div>
        ))}
      </div>

     {/* Add FAQ Modal */}
     <Modal
        centered
        open={open}
        onCancel={closeModal}
        footer={null}
        width={500}
      >
        <div>
          <h1 className="text-xl mb-2">+ Add FAQ</h1>

          <div>
            <p className="mb-1">Question</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
              placeholder="What is an affiliate e-commerce website?"
            />
          </div>

          <div className="mt-3">
            <p className="mb-1">Answer</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
              placeholder="Provide the answer here"
            />
          </div>

          <div className="flex justify-center mt-11">
            <button className="bg-[#02111E] rounded py-2 px-4 text-white">
              Publish
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit FAQ Modal */}
      <Modal
        centered
        open={editOpen}
        onCancel={closeModal}
        footer={null}
        width={500}
      >
        <div>
          <h1 className="text-xl mb-2">Edit FAQ</h1>

          <div>
            <p className="mb-1">Question</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
              value={currentFAQ?.title || ""}
              onChange={(e) =>
                setCurrentFAQ({ ...currentFAQ, title: e.target.value })
              }
            />
          </div>

          <div className="mt-3">
            <p className="mb-1">Answer</p>
            <input
              className="border w-full border-neutral-400 rounded p-2 px-4 bg-[#00000000]"
              type="text"
              value={currentFAQ?.ans || ""}
              onChange={(e) =>
                setCurrentFAQ({ ...currentFAQ, ans: e.target.value })
              }
            />
          </div>

          <div className="flex justify-center mt-11">
            <button className="bg-[#02111E] rounded py-2 px-4 text-white">
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
