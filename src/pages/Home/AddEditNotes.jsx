import { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  // add note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  // edit note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative w-full max-w-[500px] sm:max-w-[600px] mx-auto p-4">
      {/* Close button */}
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-slate-100 hover:bg-slate-200"
        onClick={onClose}
      >
        <MdClose className="text-lg text-slate-600" />
      </button>

      {/* Title input */}
      <div className="flex flex-col gap-2">
        <label className="input-label text-sm sm:text-base">TITLE</label>
        <input
          type="text"
          className="text-sm sm:text-base text-slate-950 outline-none bg-slate-50 p-3 rounded-md border border-slate-200 w-full resize-none"
          placeholder="Enter the title..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content textarea */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-sm sm:text-base">CONTENT</label>
        <textarea
          className="text-sm sm:text-base text-slate-950 outline-none bg-slate-50 p-3 rounded-md border border-slate-200 w-full resize-none"
          placeholder="Enter the content..."
          rows={6}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {/* Tags input */}
      <div className="mt-3">
        <label className="input-label text-sm sm:text-base">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {/* Submit button */}
      <button
        className="btn-primary font-medium mt-5 py-2 px-4 w-full sm:w-auto"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
