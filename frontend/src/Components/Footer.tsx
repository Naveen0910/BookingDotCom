const Footer = () => {
  return (
    <div className="bg-blue-800  py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-3xl tracking-tight font-bold">
          Booking.Com
        </span>
        <div className="flex text-white gap-4 font-bold tracking-tight">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
