import React from "react";
import moment from "moment";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out p-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h6 className="text-base font-semibold text-slate-800">{title}</h6>
          <span className="text-xs text-slate-400">
            {moment(date).format("DD MMM YYYY")}
          </span>
        </div>

        <button
          onClick={onPinNote}
          className={`p-1 rounded-full hover:bg-slate-100 transition ${
            isPinned ? "text-yellow-500" : "text-slate-300"
          }`}
        >
          <MdOutlinePushPin size={18} />
        </button>
      </div>

      {/* Content */}
      <p className="text-sm text-slate-600 mt-3 line-clamp-3">
        {content || "No content available..."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 text-slate-500">
          <button
            onClick={onEdit}
            className="hover:text-green-600 transition-colors"
          >
            <MdCreate size={18} />
          </button>
          <button
            onClick={onDelete}
            className="hover:text-red-500 transition-colors"
          >
            <MdDelete size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
