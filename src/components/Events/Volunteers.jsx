import { VolunteertTable } from "./DriverVolunteers/VolunteertTable";
import { InviteDriverVolunteers } from "./DriverVolunteers/InviteDriverVolunteers";
import { SearchDriverVolunteer } from "./DriverVolunteers/SearchDriverVolunteer";

const Volunteers = () => {
  return (
    <div className="mt-5 ">
      <VolunteertTable></VolunteertTable>

      <div className="bg-[#F6F7F9] rounded my-5 lg:p-5 p-2">
        <InviteDriverVolunteers></InviteDriverVolunteers>
        <SearchDriverVolunteer></SearchDriverVolunteer>
      </div>
    </div>
  );
};

export default Volunteers;
