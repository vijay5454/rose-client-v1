import { useState } from "react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router";

const url = import.meta.env.VITE_API_URL;

const PrayerRequest = () => {
  const navigate = useNavigate();
  const [prayerRequestPayload, setPrayerRequestPayload] = useState({
    name: "",
    email: "",
    prayerRequest: "",
  });
  const handleSubmit = async () => {
    if (!prayerRequestPayload.email || !prayerRequestPayload.prayerRequest) {
      toast.error("Please enter email and the prayer request.");
      return;
    }
    const response = await axios.post(
      url + "/prayer-requests/create",
      prayerRequestPayload
    );
    if (response.status !== 200) {
      toast.error("Error happened while submitting the prayer request.");
    }
    if (response.status === 200) {
      toast.success("Prayer request submitted successfully!");
      setPrayerRequestPayload({
        name: "",
        email: "",
        prayerRequest: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  return (
    <section className="min-h-[81vh] md:min-h-[80vh] bg-secondary p-2 md:p-8">
      <h1 className="font-bold text-center mb-3">Prayer Request</h1>
      <div className="flex flex-col gap-3 md:max-w-[50%] md:mx-auto">
        <input
          type="text"
          id="name"
          placeholder="Name (optional)"
          className="px-2 py-3 rounded-md focus:outline-primary"
          value={prayerRequestPayload.name}
          onChange={(e) => {
            setPrayerRequestPayload((prevValue) => {
              return { ...prevValue, name: e.target.value };
            });
          }}
        />
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="px-2 py-3 rounded-md focus:outline-primary"
          value={prayerRequestPayload.email}
          onChange={(e) => {
            setPrayerRequestPayload((prevValue) => {
              return { ...prevValue, email: e.target.value };
            });
          }}
        />
        <textarea
          id="prayer-request"
          rows={10}
          className="px-2 py-3 rounded-md focus:outline-primary"
          placeholder="Type your prayer request here."
          value={prayerRequestPayload.prayerRequest}
          onChange={(e) => {
            setPrayerRequestPayload((prevValue) => {
              return { ...prevValue, prayerRequest: e.target.value };
            });
          }}
        />
      </div>
      <div className="flex justify-center items-center mt-3">
        <Button
          className="text-black bg-primary-foreground hover:bg-primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </section>
  );
};

export default PrayerRequest;
