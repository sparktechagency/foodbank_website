import React from "react";

export const HolocaustCardSection = () => {
  return (
    <div>
      <div className="md:grid grid-cols-3 gap-4 max-w-[900px] mt-9 mb-11">
        <div className="rounded-xl shadow p-3">
          <h1>Holocaust Survivors</h1>
          <h1 className="text-2xl font-semibold mt-2">0</h1>
        </div>
        <div className="rounded-xl shadow p-3 my-4 lg:my-0">
          <h1>Non-Holocaust Survivors</h1>
          <h1 className="text-2xl font-semibold mt-2">0</h1>
        </div>
        <div className="rounded-xl shadow p-3">
          <h1>Total</h1>
          <h1 className="text-2xl font-semibold mt-2">0</h1>
        </div>
      </div>
    </div>
  );
};
