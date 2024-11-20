import { useState } from "react";
import JoditEditor from "jodit-react";

const TermsCondition = () => {
  const [content, setContent] = useState("<p>Terms & Conditions</p>");

  const config = {
    readonly: false,
    toolbar: true, 
  };

  const handleSave = () => {
    
    console.log(content);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Terms & Condition</h1>

      <JoditEditor
        value={content}
        config={config}
        onChange={(newContent) => setContent(newContent)}
      />

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#02111E] py-2 px-4 rounded text-white"
        >
          Save & change
        </button>
      </div>
    </div>
  );
};

export default TermsCondition;
