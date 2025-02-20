const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-[#595959]">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium"> 2025 Session Welcome!</h2>
            <span className="text-xs text-[#595959] bg-white rounded-md px-1 py-1">
              01-01-2025
            </span>
          </div>
          <p className="text-sm text-[#333333] mt-1">
            Blessed day and welcome all! Wish for a happy and fruitful year ahead of us.
          </p>
        </div>
        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Notice : Field Trip Form 3</h2>
            <span className="text-xs text-[#595959] bg-white rounded-md px-1 py-1">
              05-01-2025
            </span>
          </div>
          <p className="text-sm text-[#333333] mt-1">
            Take Note, teachers who are interested may contact the secretary of your department.
          </p>
        </div>
        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Teacher's Meeting</h2>
            <span className="text-xs text-[#595959] bg-white rounded-md px-1 py-1">
              08-01-2025
            </span>
          </div>
          <p className="text-sm text-[#333333] mt-1">
            Unfortunately meeting is rescheduled, will follow up to another date. Please Take Note!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;