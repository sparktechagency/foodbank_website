import { Modal } from "antd";
import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const ClientDetailsPage = () => {




  const [modal2Open, setModal2Open] = useState(false);

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    number: "",
    adress: "",
    apartment: "",
    city: "",
    state: "",
    zipcode: "",
    date: "",
    timeFrom: "",
    timeTo: "",
    deliveryDrivers: "",
    warehouseVolunteers: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.first.trim()) formErrors.first = "Event first is required.";
    if (!formData.last.trim()) formErrors.last = "Event last is required.";
    if (!formData.email.trim()) formErrors.email = "Event last is required.";
    if (!formData.number.trim())
      formErrors.number = "Event number is required.";
    if (!formData.adress.trim())
      formErrors.adress = "Event adress is required.";
    if (!formData.apartment.trim())
      formErrors.apartment = "Event apartment is required.";
    if (!formData.city) formErrors.city = "Event city is required.";
    if (!formData.state) formErrors.state = "Event state is required.";

    if (!formData.zipcode) formErrors.zipcode = "zipcode is required.";
    if (!formData.date) formErrors.date = "Date is required.";
    if (!formData.timeFrom) formErrors.timeFrom = "Start time is required.";
    if (!formData.timeTo) formErrors.timeTo = "End time is required.";
    if (!formData.deliveryDrivers)
      formErrors.deliveryDrivers = "Delivery drivers count is required.";
    if (!formData.warehouseVolunteers)
      formErrors.warehouseVolunteers = "Volunteers count is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);

      setModal2Open(false);
      setFormData({
        first: "",
        last: "",
        email: "",
        number: "",
        adress: "",
        apartment: "",
        city: "",
        state: "",
        zipcode: "",
        date: "",
        timeFrom: "",
        timeTo: "",
        deliveryDrivers: "",
        warehouseVolunteers: "",
      });
    }
  };






  const eventData = [
    {
      event: "September Holiday Drive 9/2",
      driver: "Holiday Drive",
      schedule: "9/2/24",
      confirmation: "confirmed",
      dietary: "11/25",
      people: "11/25",
      bags: "11/25",
    },
    {
      event: "Mitzvah Sunday 10/14",
      driver: "Mitzvah Day",
      schedule: "10/14/24",
      confirmation: "confirmed",
      dietary: "11/25",
      people: "11/25",
      bags: "11/25",
    },
    {
      event: "Mitzvah Sunday 10/28",
      driver: "Mitzvah Day",
      schedule: "10/28/24",
      confirmation: "confirmed",
      dietary: "11/25",
      people: "11/25",
      bags: "11/25",
    },
  ];

  return (
    <div className=" min-h-screen">
      <div className="bg-[#FAFAFA] px-5 py-6">
        <h1 className="flex gap-1 ">
          <span className="text-[#007AFF]">Clients</span>{" "}
          <IoIosArrowForward className="mt-1" /> Alena Armyeva
        </h1>

        <h1 className="text-2xl font-bold mt-3">Clients</h1>
      </div>

      <div className="px-5 pt-5">
        <h2 className="text-md font-semibold mb-1 ">Details</h2>
        <div className="flex justify-between border p-5 max-w-[900px]">
          <div>
            <div className="flex gap-16">
              <div>
                <div className="mb-8">
                  <h1 className="font-semibold">First Name</h1>
                  <p>Altena</p>
                </div>

                <div className="mb-8">
                  <h1 className="font-semibold">Email</h1>
                  <p>alena@gmail.com</p>
                </div>
              </div>

              <div>
                <div className="mb-7">
                  <h1 className="font-semibold">Last Name</h1>
                  <p>Faris</p>
                </div>
                <div>
                  <h1 className="font-semibold">Phone</h1>
                  <p>017232432432</p>
                </div>
              </div>
              
            </div>
            <div>
            <div>
            <Link to={'/clients'}><button className="border border-[#234E6F] px-4 py-1 rounded-full text-[#234E6F]">
              Archive
            </button></Link>
          </div>
              <div className="mt-4">
                <h1 className="font-semibold">Adress</h1>
                <p>1460 NW 80th Ave, Apt 402, Margate, FL 33063</p>
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => setModal2Open(true)} className="border border-[#234E6F] px-4 py-1 rounded-full text-[#234E6F]">
              Edit
            </button>
          </div>
        </div>
        

        <div>
          <h1 className="text-md font-semibold mb-1 mt-8">Events</h1>
          <table className="min-w-full border-collapse  border border-gray-300">
            <thead>
              <tr className="bg-gray-100 ">
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Event Name
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Event Type
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Date
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Spots Filled
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Spots Filled
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Spots Filled
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium">
                  Volunteer Spots Filled
                </th>
                <th className=" px-4 py-2 text-left text-sm font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {eventData.map((event, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className=" px-4 py-3 text-sm">
                  <Link to={"/event/eventDetails"}><p className="text-[#007AFF] underline">{event.event}</p></Link>
                  </td>
                  <td className=" px-4 py-3 text-sm">{event.driver}</td>
                  <td className=" px-4 py-3 text-sm">{event.schedule}</td>
                  <td className="px-4 py-3 text-sm flex">
                    <p className="bg-[#F0F9F2] border border-[#81c9a6] rounded-full text-[#236847] py-1 px-3">
                      {event.confirmation}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm">{event.dietary}</td>
                  <td className="px-4 py-3 text-sm">{event.people}</td>
                  <td className="px-4 py-3 text-sm">{event.bags}</td>

                  <td className="px-4 py-3 text-sm text-gray-500 flex justify-end">
                    <BiDotsVerticalRounded />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>



      <Modal
        title="Add Event"
        centered
        open={modal2Open}
        onCancel={() => {
          setModal2Open(false);
          setFormData({
            first: "",
            last: "",
            email: "",
            number: "",
            adress: "",
            apartment: "",
            city: "",
            state: "",
            zipcode: "",
            date: "",
            timeFrom: "",
            timeTo: "",
            deliveryDrivers: "",
            warehouseVolunteers: "",
          });
          setErrors({});
        }}
        footer={[
          <button
            key="save"
            onClick={handleSubmit}
            className="bg-[#234E6F] text-white rounded-full px-5 py-2"
          >
            Save
          </button>,
        ]}
      >
        <form>
          <div className="mt-4">
            <div className="flex gap-3">
              <label htmlFor="first">
                <span className="font-semibold">First Name</span>
                <input
                  className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                  type="text"
                  name="first"
                  id="first"
                  value={formData.first}
                  onChange={handleInputChange}
                />
                {errors.first && (
                  <p className="text-red-500 text-sm">{errors.first}</p>
                )}
              </label>

              <label htmlFor="last">
                <span className="font-semibold">Last Name</span>
                <input
                  className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                  type="text"
                  name="last"
                  id="last"
                  value={formData.last}
                  onChange={handleInputChange}
                />
                {errors.last && (
                  <p className="text-red-500 text-sm">{errors.last}</p>
                )}
              </label>
            </div>

            <label htmlFor="Holocaust">
              <span className="font-semibold">Holocaust Survivor</span>
              <select
                className="w-full border mb-2 bg-white border-neutral-400 rounded-md py-2"
                name="Holocaust"
                id="Holocaust"
                value={formData.Holocaust}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
              {errors.Holocaust && (
                <p className="text-red-500 text-sm">{errors.Holocaust}</p>
              )}
            </label>

            <span className="font-semibold">Date of Birth</span>
              <input className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1" type="date" name="" id="" />



            

            <label htmlFor="number">
              <span className="font-semibold">Phone Number</span>
              <input
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                type="text"
                name="number"
                id="number"
                value={formData.number}
                onChange={handleInputChange}
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number}</p>
              )}
            </label>

            <label htmlFor="phonnumber">
              <span className="font-semibold">Alternate Phone Number</span>
              <input
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                type="text"
                name="phonnumber"
                id="phonnumber"
                value={formData.phonnumber}
                onChange={handleInputChange}
              />
              {errors.phonnumber && (
                <p className="text-red-500 text-sm">{errors.phonnumber}</p>
              )}
            </label>

            <label htmlFor="adress">
              <span className="font-semibold">Adress</span>
              <input
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                type="text"
                name="adress"
                id="adress"
                value={formData.adress}
                onChange={handleInputChange}
              />
              {errors.adress && (
                <p className="text-red-500 text-sm">{errors.adress}</p>
              )}
            </label>

            <label htmlFor="apartment">
              <span className="font-semibold">Apartment, suite, etc. *</span>
              <input
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                type="text"
                name="apartment"
                id="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
              />
              {errors.apartment && (
                <p className="text-red-500 text-sm">{errors.apartment}</p>
              )}
            </label>
          </div>

          <div className="flex gap-3">
            <label htmlFor="city">
              <span className="font-semibold">city</span>
              <select
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleInputChange}
              >
                <option value="">Select Event Type</option>
                <option value="mitzvah day">Mitzvah Day</option>
                <option value="tujbah day">Tujbah Day</option>
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </label>

            <label htmlFor="state">
              <span className="font-semibold">state</span>
              <select
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="">Select Event Type</option>
                <option value="mitzvah day">Mitzvah Day</option>
                <option value="tujbah day">Tujbah Day</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </label>

            <label htmlFor="zipcode">
              <span className="font-semibold">zipcode</span>
              <select
                className="w-full border bg-white border-neutral-400 mt-1 py-2 rounded-md mb-1"
                name="zipcode"
                id="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
              >
                <option value="">Select Location</option>
                <option value="The Cupboard">The Cupboard</option>
                <option value="Tujbah Day">Tujbah Day</option>
              </select>
              {errors.zipcode && (
                <p className="text-red-500 text-sm">{errors.zipcode}</p>
              )}
            </label>
          </div>


          <div className="flex gap-3 mt-3">
              <label className="w-full" htmlFor="deliveryDrivers">
                <span className="font-semibold">Number of People in Household</span>
                <select
                  className={`border border-neutral-400 w-full py-2 bg-white rounded px-1`}
                  name="deliveryDrivers"
                  id="deliveryDrivers"
                  
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                
              </label>

              <label className="w-full" htmlFor="warehouseVolunteers">
                <span className="font-semibold">
                  Number of Bags
                </span>
                <select
                  className={`border border-neutral-400 w-full bg-white rounded px-1 py-2`}
                  name="warehouseVolunteers"
                  id="warehouseVolunteers"
                  
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                
              </label>
            </div>

          <div className="  mt-3">
            <label htmlFor="deliveryDrivers">
              <span className="font-semibold">Delivery Instructions.</span>
              <select
                className="w-full border mb-2 bg-white border-neutral-400 rounded-md py-2"
                name="deliveryDrivers"
                id="deliveryDrivers"
                value={formData.deliveryDrivers}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              {errors.deliveryDrivers && (
                <p className="text-red-500 text-sm">{errors.deliveryDrivers}</p>
              )}
            </label>

            <label htmlFor="warehouseVolunteers">
              <span className="font-semibold">Client Delivery Group(optional)</span>
              <select
                className="w-full  border bg-white border-neutral-400 rounded-md py-2"
                name="warehouseVolunteers"
                id="warehouseVolunteers"
                value={formData.warehouseVolunteers}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              {errors.warehouseVolunteers && (
                <p className="text-red-500 text-sm">
                  {errors.warehouseVolunteers}
                </p>
              )}
            </label>

            
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClientDetailsPage;
