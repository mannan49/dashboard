import { useNavigate } from "react-router-dom";
import TicketCard from "../components/utils/TicketCard";
import { IoScanCircleSharp } from "react-icons/io5";

const BookingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="content flex flex-col">
      <TicketCard />
      <button
        className="app-btn flex gap-2 max-w-fit mx-auto mb-20"
        onClick={() => navigate("/scanner")}
      >
        Scan Next Passenger <IoScanCircleSharp className="text-2xl" />{" "}
      </button>
    </div>
  );
};

export default BookingPage;
