import { useState } from "react";
import useStore from "../store/useStore";

const Notes = () => {
  const savedNotes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  const [note, setNote] = useState(savedNotes || "");

  const handleChange = (e) => {
    setNote(e.target.value);
    setNotes(e.target.value);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-black text-lg sm:text-xl font-bold mb-2 sm:mb-4">
        All notes
      </h2>

      <textarea
        value={note}
        onChange={handleChange}
        placeholder="Write your notes here..."
        className="scrollable w-full flex-1 bg-transparent resize-none outline-none text-black text-xs sm:text-sm leading-5 sm:leading-6 overflow-y-auto"
      />
    </div>
  );
};

export default Notes;
