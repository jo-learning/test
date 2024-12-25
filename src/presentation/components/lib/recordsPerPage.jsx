import React from "react"
const RecordsPerPage = ({setItemsPerPage})  => {
    return (
        <div className="flex items-center ml-auto">
          <label className="mr-2 text-sm text-gray-800 whitespace-nowrap dark:text-gray-300 w-full">
            Records per page:
          </label>
          <select 
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          className="px-2 py-1 border rounded">
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
    )
}

export default RecordsPerPage;
