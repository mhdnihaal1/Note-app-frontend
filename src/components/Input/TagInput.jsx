import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const addNewTag = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addNewTag()
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="w-full">
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 text-xs sm:text-sm text-slate-900 bg-slate-100 px-2 sm:px-3 py-1 rounded"
            >
              # {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-600 transition"
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input Section */}
      <div className="flex items-center gap-2 sm:gap-4 mt-3 flex-wrap sm:flex-nowrap">
        <input
          value={inputValue}
          type="text"
          className="flex-1 text-xs sm:text-sm bg-transparent border px-2 sm:px-3 py-2 rounded outline-none w-full"
          placeholder="Add tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 transition"
          onClick={addNewTag}
        >
          <MdAdd className="text-lg sm:text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  )
}

export default TagInput
